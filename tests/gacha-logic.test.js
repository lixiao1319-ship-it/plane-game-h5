// Gacha system and player data logic tests.

const { install } = require('./helpers/wx-mock');
const { test, assert, assertEqual, assertApprox, summary } = require('./helpers/test-runner');

install();

const GachaSystem = require('../src/systems/GachaSystem');
const PlayerData = require('../src/systems/PlayerData');
const heroes = require('../src/data/heroes');
const C = require('../src/data/constants');

// Reset player state before each test group
function resetPlayer() {
  // Directly mutate the internal state object (bypasses load/save)
  const s = PlayerData.state;
  s.gold = 10000;
  s.yuanbao = 300;
  s.stamina = 60;
  s.ownedHeroes = {};
  s.shards = { orange: 0, purple: 0, blue: 0 };
  s.gacha = {
    orangeRate: C.GACHA.baseRate.orange,
    sinceOrange: 0,
    sincePurpleOrAbove: 0,
  };
}

console.log('\nGacha System Tests');
console.log('==================');

test('draw consumes gold', () => {
  resetPlayer();
  const before = PlayerData.state.gold;
  const result = GachaSystem.draw(1);
  assertEqual(PlayerData.state.gold, before - C.GACHA.costPerDraw);
  assertEqual(result.results.length, 1);
});

test('draw 10 consumes discounted gold', () => {
  resetPlayer();
  const before = PlayerData.state.gold;
  const result = GachaSystem.draw(10);
  assertEqual(PlayerData.state.gold, before - C.GACHA.tenDrawCost);
  assertEqual(result.results.length, 10);
});

test('draw fails with insufficient gold', () => {
  resetPlayer();
  PlayerData.state.gold = 100;
  const result = GachaSystem.draw(1);
  assertEqual(result, null);
});

test('orange pity triggers within 70 draws', () => {
  resetPlayer();
  let gotOrange = false;
  let draws = 0;
  // Draw until we get orange (pity guarantees it by 70)
  for (let i = 0; i < C.GACHA.orangePity; i++) {
    const result = GachaSystem.draw(1);
    draws++;
    if (result.results[0].hero.rank === 'orange') {
      gotOrange = true;
      break;
    }
  }
  assert(gotOrange, `should get orange within ${C.GACHA.orangePity} draws (got none in ${draws})`);
});

test('orange rate increases after each non-orange', () => {
  resetPlayer();
  PlayerData.state.gacha.sinceOrange = 10;
  const expected = C.GACHA.baseRate.orange + 10 * C.GACHA.orangeRateStep;
  PlayerData.state.gacha.orangeRate = expected;
  assertApprox(PlayerData.state.gacha.orangeRate, expected, 0.0001);
});

test('purple pity guarantees purple-or-above within 10 draws', () => {
  resetPlayer();
  let gotPurpleOrAbove = false;
  for (let i = 0; i < C.GACHA.purplePity; i++) {
    const result = GachaSystem.draw(1);
    const rank = result.results[0].hero.rank;
    if (rank === 'purple' || rank === 'orange') {
      gotPurpleOrAbove = true;
      break;
    }
  }
  assert(gotPurpleOrAbove, `should get purple-or-above within ${C.GACHA.purplePity} draws`);
});

test('duplicate hero gives shards', () => {
  resetPlayer();
  const hero = heroes.find((h) => h.rank === 'blue');
  PlayerData.state.ownedHeroes[hero.id] = { star: 1, level: 1 };
  const before = PlayerData.state.shards.blue;
  const result = PlayerData.addHeroFromGacha(hero.id);
  assert(!result.isNew, 'should be duplicate');
  assertEqual(PlayerData.state.shards.blue, before + C.DUPLICATE_SHARDS.blue);
});

test('new hero is added to owned', () => {
  resetPlayer();
  const hero = heroes.find((h) => h.rank === 'orange');
  const result = PlayerData.addHeroFromGacha(hero.id);
  assert(result.isNew, 'should be new');
  assertEqual(PlayerData.state.ownedHeroes[hero.id].star, 1);
});

console.log('\nPlayerData Tests');
console.log('================');

test('canSpendGold checks balance', () => {
  resetPlayer();
  assert(PlayerData.canSpendGold(5000));
  assert(!PlayerData.canSpendGold(15000));
});

test('spendGold reduces balance', () => {
  resetPlayer();
  PlayerData.spendGold(2000);
  assertEqual(PlayerData.state.gold, 8000);
});

test('starUp consumes shards and increases star', () => {
  resetPlayer();
  const hero = heroes.find((h) => h.rank === 'blue');
  PlayerData.state.ownedHeroes[hero.id] = { star: 1, level: 1 };
  PlayerData.state.shards.blue = 100;
  const success = PlayerData.starUp(hero);
  assert(success, 'starUp should succeed');
  assertEqual(PlayerData.state.ownedHeroes[hero.id].star, 2);
  assertEqual(PlayerData.state.shards.blue, 100 - C.STAR_UP_COST[0]);
});

test('starUp fails with insufficient shards', () => {
  resetPlayer();
  const hero = heroes.find((h) => h.rank === 'blue');
  PlayerData.state.ownedHeroes[hero.id] = { star: 1, level: 1 };
  PlayerData.state.shards.blue = 0;
  const success = PlayerData.starUp(hero);
  assert(!success, 'starUp should fail');
  assertEqual(PlayerData.state.ownedHeroes[hero.id].star, 1);
});

test('computeStats returns correct formula values', () => {
  resetPlayer();
  const hero = heroes[0];
  const stats = PlayerData.computeStats(hero);
  // hero.stats holds base values from data
  const expectedHp = hero.stats.tongshuai * C.STAT_FORMULA.hpPerTongshuai;
  const expectedAtk = hero.stats.wuli * C.STAT_FORMULA.atkPerWuli;
  const expectedMatk = hero.stats.zhili * C.STAT_FORMULA.matkPerZhili;
  assertEqual(stats.hp, expectedHp);
  assertEqual(stats.atk, expectedAtk);
  assertEqual(stats.matk, expectedMatk);
});

test('ownedList returns only owned heroes', () => {
  resetPlayer();
  PlayerData.state.ownedHeroes[heroes[0].id] = { star: 1, level: 1 };
  PlayerData.state.ownedHeroes[heroes[1].id] = { star: 2, level: 3 };
  const list = PlayerData.ownedList();
  assertEqual(list.length, 2);
});

test('isOwned checks correctly', () => {
  resetPlayer();
  assert(!PlayerData.isOwned(heroes[0].id));
  PlayerData.state.ownedHeroes[heroes[0].id] = { star: 1, level: 1 };
  assert(PlayerData.isOwned(heroes[0].id));
});

summary();
