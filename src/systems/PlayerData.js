const Storage = require('../core/Storage');
const heroes = require('../data/heroes');
const C = require('../data/constants');

const SAVE_KEY = 'sgz_player_save_v1';

function defaultState() {
  return {
    gold: C.STARTING_RESOURCES.gold,
    yuanbao: C.STARTING_RESOURCES.yuanbao,
    stamina: C.STARTING_RESOURCES.stamina,
    lastStaminaTs: Date.now(),
    // ownedHeroes: id -> { star: 1, level: 1, count: 1 }
    ownedHeroes: {},
    // shards: rank -> generic shard pool? Spec says duplicates convert to rank-locked shards
    // used only to star-up heroes of that rank. Track per-rank pool for simplicity (MVP).
    shards: { orange: 0, purple: 0, blue: 0 },
    // gacha pity counters
    gacha: { sinceOrange: 0, sincePurpleOrAbove: 0, orangeRate: C.GACHA.baseRate.orange },
  };
}

let state = null;

function load() {
  if (state) return state;
  const saved = Storage.get(SAVE_KEY, null);
  state = saved ? Object.assign(defaultState(), saved) : defaultState();
  applyStaminaRegen();
  return state;
}

function save() {
  if (!state) return;
  Storage.set(SAVE_KEY, state);
}

function applyStaminaRegen() {
  const now = Date.now();
  const elapsedMinutes = (now - state.lastStaminaTs) / 60000;
  const regen = Math.floor(elapsedMinutes / C.STAMINA.regenPerMinutes);
  if (regen > 0 && state.stamina < C.STAMINA.max) {
    state.stamina = Math.min(C.STAMINA.max, state.stamina + regen);
    state.lastStaminaTs = now;
    save();
  } else if (!state.lastStaminaTs) {
    state.lastStaminaTs = now;
  }
}

function getHero(id) {
  return heroes.find((h) => h.id === id);
}

function ownedList() {
  load();
  return Object.keys(state.ownedHeroes)
    .map((id) => ({ hero: getHero(id), owned: state.ownedHeroes[id] }))
    .filter((e) => e.hero);
}

function isOwned(id) {
  load();
  return !!state.ownedHeroes[id];
}

// Adds a hero pulled from gacha. Returns { isNew, shardsGained }.
function addHeroFromGacha(id) {
  load();
  const hero = getHero(id);
  if (!hero) return { isNew: false, shardsGained: 0 };
  const existing = state.ownedHeroes[id];
  if (!existing) {
    state.ownedHeroes[id] = { star: 1, level: 1, count: 1 };
    return { isNew: true, shardsGained: 0 };
  }
  existing.count += 1;
  const shards = C.DUPLICATE_SHARDS[hero.rank];
  state.shards[hero.rank] += shards;
  return { isNew: false, shardsGained: shards };
}

function canSpendGold(amount) {
  load();
  return state.gold >= amount;
}

function spendGold(amount) {
  load();
  if (state.gold < amount) return false;
  state.gold -= amount;
  save();
  return true;
}

function addGold(amount) {
  load();
  state.gold += amount;
  save();
}

function getStarUpCost(hero) {
  const owned = state.ownedHeroes[hero.id];
  if (!owned) return null;
  if (owned.star >= C.MAX_STAR) return null;
  return C.STAR_UP_COST[owned.star - 1];
}

function canStarUp(hero) {
  load();
  const cost = getStarUpCost(hero);
  if (cost === null) return false;
  return state.shards[hero.rank] >= cost;
}

function starUp(hero) {
  load();
  if (!canStarUp(hero)) return false;
  const cost = getStarUpCost(hero);
  state.shards[hero.rank] -= cost;
  state.ownedHeroes[hero.id].star += 1;
  save();
  return true;
}

// Computes derived combat stats per docs/design-mvp-v2.md 属性成长公式.
function computeStats(hero) {
  load();
  const owned = state.ownedHeroes[hero.id] || { star: 1, level: 1 };
  const levelCoef = 1 + C.LEVEL_GROWTH_PER_LEVEL * (owned.level - 1);
  const starCoef = C.STAR_MULTIPLIER[owned.star - 1];
  const wuli = hero.stats.wuli * levelCoef * starCoef;
  const zhili = hero.stats.zhili * levelCoef * starCoef;
  const tongshuai = hero.stats.tongshuai * levelCoef * starCoef;
  const sudu = hero.stats.sudu + C.SPEED_GROWTH_PER_LEVEL * (owned.level - 1);
  const hp = tongshuai * C.STAT_FORMULA.hpPerTongshuai;
  const atk = wuli * C.STAT_FORMULA.atkPerWuli;
  const matk = zhili * C.STAT_FORMULA.matkPerZhili;
  const atkInterval = Math.max(
    0.5,
    C.STAT_FORMULA.atkIntervalBase - sudu * C.STAT_FORMULA.atkIntervalPerSudu
  );
  return {
    star: owned.star,
    level: owned.level,
    wuli: Math.round(wuli),
    zhili: Math.round(zhili),
    tongshuai: Math.round(tongshuai),
    sudu: Math.round(sudu),
    hp: Math.round(hp),
    atk: Math.round(atk),
    matk: Math.round(matk),
    atkInterval: Math.round(atkInterval * 100) / 100,
  };
}

module.exports = {
  load,
  save,
  getHero,
  ownedList,
  isOwned,
  addHeroFromGacha,
  canSpendGold,
  spendGold,
  addGold,
  getStarUpCost,
  canStarUp,
  starUp,
  computeStats,
  get state() {
    return load();
  },
};
