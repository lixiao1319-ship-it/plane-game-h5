// End-to-end integration test: simulate the main user flow through the game.

const { install, mockCanvasContext } = require('./helpers/wx-mock');
const { test, assert, assertEqual, summary } = require('./helpers/test-runner');

install();

const SceneManager = require('../src/core/SceneManager');
const Screen = require('../src/core/Screen');
const PlayerData = require('../src/systems/PlayerData');
const GachaSystem = require('../src/systems/GachaSystem');
const heroes = require('../src/data/heroes');
const C = require('../src/data/constants');

// Set up screen
Screen.width = 375;
Screen.height = 667;
Screen.dpr = 2;

function resetPlayer() {
  const s = PlayerData.state;
  s.gold = 10000;
  s.yuanbao = 300;
  s.stamina = 60;
  s.ownedHeroes = {};
  s.shards = { orange: 0, purple: 0, blue: 0 };
  s.gacha = { orangeRate: C.GACHA.baseRate.orange, sinceOrange: 0, sincePurpleOrAbove: 0 };
}

function renderScene(scene) {
  const ctx = mockCanvasContext();
  if (scene.update) scene.update(0.016);
  if (scene.render) scene.render(ctx);
}

console.log('\nMain Flow Integration Tests');
console.log('==========================');

test('Flow: Home -> Gacha -> Draw -> Result -> Back', () => {
  resetPlayer();
  const sm = new SceneManager();

  // 1. Boot into Home
  const createHome = require('../src/scenes/HomeScene');
  sm.push(createHome(sm));
  assertEqual(sm.top().constructor.name, 'Object', 'home scene should be on top');
  renderScene(sm.top());

  // 2. Navigate to Gacha
  const createGacha = require('../src/scenes/GachaScene');
  sm.push(createGacha(sm));
  assertEqual(sm.stack.length, 2);
  renderScene(sm.top());

  // 3. Perform a 5-draw
  const beforeGold = PlayerData.state.gold;
  const result = GachaSystem.draw(5);
  assertEqual(result.results.length, 5);
  assertEqual(PlayerData.state.gold, beforeGold - C.GACHA.fiveDrawCost);

  // 4. Show result scene
  const createResult = require('../src/scenes/GachaResultScene');
  sm.push(createResult(sm, result.results));
  assertEqual(sm.stack.length, 3);
  renderScene(sm.top());

  // 5. Go back to gacha
  sm.pop();
  assertEqual(sm.stack.length, 2);
  renderScene(sm.top());

  // 6. Go back to home
  sm.pop();
  assertEqual(sm.stack.length, 1);
  renderScene(sm.top());
});

test('Flow: Home -> Roster -> HeroDetail -> StarUp -> Back', () => {
  resetPlayer();
  const sm = new SceneManager();

  // 1. Home
  const createHome = require('../src/scenes/HomeScene');
  sm.push(createHome(sm));
  renderScene(sm.top());

  // 2. Give player a hero first
  const hero = heroes.find((h) => h.rank === 'blue');
  PlayerData.addHeroFromGacha(hero.id);
  PlayerData.state.shards.blue = 100;

  // 3. Navigate to Roster
  const createRoster = require('../src/scenes/RosterScene');
  sm.push(createRoster(sm));
  assertEqual(sm.stack.length, 2);
  renderScene(sm.top());

  // 4. Navigate to HeroDetail
  const createDetail = require('../src/scenes/HeroDetailScene');
  sm.push(createDetail(sm, hero));
  assertEqual(sm.stack.length, 3);
  renderScene(sm.top());

  // 5. Star up
  const beforeStar = PlayerData.state.ownedHeroes[hero.id].star;
  const success = PlayerData.starUp(hero);
  assert(success, 'starUp should succeed');
  assertEqual(PlayerData.state.ownedHeroes[hero.id].star, beforeStar + 1);

  // 6. Re-render detail (should reflect new star)
  renderScene(sm.top());

  // 7. Back to roster
  sm.pop();
  assertEqual(sm.stack.length, 2);
  renderScene(sm.top());

  // 8. Back to home
  sm.pop();
  assertEqual(sm.stack.length, 1);
  renderScene(sm.top());
});

test('Flow: Multiple draws until orange pity', () => {
  resetPlayer();
  let orangeCount = 0;
  let draws = 0;
  const maxDraws = 100;

  while (orangeCount === 0 && draws < maxDraws) {
    const result = GachaSystem.draw(1);
    draws++;
    if (result.results[0].hero.rank === 'orange') orangeCount++;
  }

  assert(orangeCount > 0, 'should get orange within 100 draws (pity at 70)');
  assert(draws <= C.GACHA.orangePity, `should get orange by pity (${C.GACHA.orangePity})`);
});

test('Flow: Roster scrolling with many heroes', () => {
  resetPlayer();
  const sm = new SceneManager();
  const createRoster = require('../src/scenes/RosterScene');
  sm.push(createRoster(sm));
  const scene = sm.top();
  scene.onEnter();

  // Simulate scroll to bottom
  scene.onTouchStart(200, 400);
  scene.onTouchMove(200, 100); // drag up 300px
  scene.onTouchEnd(200, 100);

  // Render should not throw even at max scroll
  renderScene(scene);

  // Simulate tap on a hero (top-left area after scroll)
  scene.onTouchStart(50, 200);
  scene.onTouchEnd(50, 200);
});

test('Flow: HeroDetail scrolling', () => {
  resetPlayer();
  const hero = heroes[0];
  const sm = new SceneManager();
  const createDetail = require('../src/scenes/HeroDetailScene');
  sm.push(createDetail(sm, hero));
  const scene = sm.top();
  scene.onEnter();

  // Scroll down
  scene.onTouchStart(200, 400);
  scene.onTouchMove(200, 100);
  scene.onTouchEnd(200, 100);
  renderScene(scene);

  // Scroll up
  scene.onTouchStart(200, 100);
  scene.onTouchMove(200, 400);
  scene.onTouchEnd(200, 400);
  renderScene(scene);
});

test('Flow: Gacha with insufficient gold shows toast', () => {
  resetPlayer();
  PlayerData.state.gold = 50; // not enough for single draw
  const sm = new SceneManager();
  const createGacha = require('../src/scenes/GachaScene');
  sm.push(createGacha(sm));
  const scene = sm.top();
  scene.onEnter();
  renderScene(scene);

  // Try to draw — should fail gracefully
  const result = GachaSystem.draw(1);
  assertEqual(result, null);
});

test('Flow: All heroes render in roster without crash', () => {
  resetPlayer();
  const sm = new SceneManager();
  const createRoster = require('../src/scenes/RosterScene');
  sm.push(createRoster(sm));
  const scene = sm.top();
  scene.onEnter();

  // Own all heroes to test full rendering path
  heroes.forEach((h) => {
    PlayerData.state.ownedHeroes[h.id] = { star: 3, level: 5 };
  });

  // Render at multiple scroll positions
  for (let i = 0; i < 5; i++) {
    scene.scrollY = i * 200;
    renderScene(scene);
  }
});

summary();
