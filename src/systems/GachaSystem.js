const heroes = require('../data/heroes');
const C = require('../data/constants');
const PlayerData = require('./PlayerData');

const pools = {
  orange: heroes.filter((h) => h.rank === 'orange'),
  purple: heroes.filter((h) => h.rank === 'purple'),
  blue: heroes.filter((h) => h.rank === 'blue'),
};

function pickFromPool(rank) {
  const pool = pools[rank];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Rolls a single rank using current dynamic orange rate + pity rules, then
// advances/​resets the pity counters. Mutates PlayerData.state.gacha.
function rollRank() {
  const state = PlayerData.state;
  const g = state.gacha;

  let forcedRank = null;
  if (g.sinceOrange + 1 >= C.GACHA.orangePity) forcedRank = 'orange';
  else if (g.sincePurpleOrAbove + 1 >= C.GACHA.purplePity) forcedRank = 'purple';

  let rank;
  if (forcedRank) {
    rank = forcedRank;
  } else {
    const r = Math.random();
    const orangeRate = g.orangeRate;
    const purpleRate = C.GACHA.baseRate.purple;
    if (r < orangeRate) rank = 'orange';
    else if (r < orangeRate + purpleRate) rank = 'purple';
    else rank = 'blue';
  }

  if (rank === 'orange') {
    g.sinceOrange = 0;
    g.sincePurpleOrAbove = 0;
    g.orangeRate = C.GACHA.baseRate.orange;
  } else {
    g.sinceOrange += 1;
    g.orangeRate = Math.min(1, C.GACHA.baseRate.orange + g.sinceOrange * C.GACHA.orangeRateStep);
    if (rank === 'purple') g.sincePurpleOrAbove = 0;
    else g.sincePurpleOrAbove += 1;
  }

  return rank;
}

function drawOne() {
  const rank = rollRank();
  const hero = pickFromPool(rank);
  const result = PlayerData.addHeroFromGacha(hero.id);
  return Object.assign({ hero }, result);
}

// count: 1 or 10. Returns { results, cost } or null if insufficient gold.
function draw(count) {
  const cost = count === 10 ? C.GACHA.tenDrawCost : C.GACHA.costPerDraw * count;
  if (!PlayerData.canSpendGold(cost)) return null;
  PlayerData.spendGold(cost);
  const results = [];
  for (let i = 0; i < count; i++) results.push(drawOne());
  PlayerData.save();
  return { results, cost };
}

function currentOrangeRate() {
  return PlayerData.state.gacha.orangeRate;
}

module.exports = { draw, currentOrangeRate, pools };
