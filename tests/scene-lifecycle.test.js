// Scene lifecycle tests: every scene must boot, render, and handle touches
// without throwing.

const { install } = require('./helpers/wx-mock');
const { test, assert, assertEqual, summary } = require('./helpers/test-runner');

install();

const SceneManager = require('../src/core/SceneManager');
const Screen = require('../src/core/Screen');

// Set up screen dimensions (game.js normally does this)
Screen.width = 375;
Screen.height = 667;
Screen.dpr = 2;

const scenes = [
  ['HomeScene', () => require('../src/scenes/HomeScene'), (sm) => [sm]],
  ['GachaScene', () => require('../src/scenes/GachaScene'), (sm) => [sm]],
  ['RosterScene', () => require('../src/scenes/RosterScene'), (sm) => [sm]],
  ['GachaResultScene', () => require('../src/scenes/GachaResultScene'), (sm) => [sm, [
    { hero: require('../src/data/heroes')[0], isNew: true, shardsGained: 0 },
  ]]],
  ['HeroDetailScene', () => require('../src/scenes/HeroDetailScene'), (sm) => [sm, require('../src/data/heroes')[0]]],
];

console.log('\nScene Lifecycle Tests');
console.log('====================');

for (const [name, loader, argBuilder] of scenes) {
  test(`${name}: create -> onEnter -> update -> render`, () => {
    const sm = new SceneManager();
    const create = loader();
    const scene = create(...argBuilder(sm));

    if (scene.onEnter) scene.onEnter();
    if (scene.update) scene.update(0.016);

    // Render with mock ctx
    const ctx = require('./helpers/wx-mock').mockCanvasContext();
    if (scene.render) scene.render(ctx);

    assert(true, 'lifecycle should not throw');
  });

  test(`${name}: touch start/move/end`, () => {
    const sm = new SceneManager();
    const create = loader();
    const scene = create(...argBuilder(sm));

    if (scene.onEnter) scene.onEnter();

    if (scene.onTouchStart) scene.onTouchStart(100, 100);
    if (scene.onTouchMove) scene.onTouchMove(100, 120);
    if (scene.onTouchEnd) scene.onTouchEnd(100, 120);

    assert(true, 'touch handlers should not throw');
  });

  test(`${name}: onResume after layout`, () => {
    const sm = new SceneManager();
    const create = loader();
    const scene = create(...argBuilder(sm));

    if (scene.onEnter) scene.onEnter();
    if (scene.onResume) scene.onResume();

    assert(true, 'onResume should not throw');
  });
}

// SceneManager stack behavior
console.log('\nSceneManager Stack Tests');
console.log('======================');

test('push adds scene to stack', () => {
  const sm = new SceneManager();
  const scene = { onEnter() {} };
  sm.push(scene);
  assertEqual(sm.stack.length, 1);
  assertEqual(sm.top(), scene);
});

test('pop removes scene and calls onExit', () => {
  const sm = new SceneManager();
  let exited = false;
  const scene = { onEnter() {}, onExit() { exited = true; } };
  sm.push(scene);
  sm.pop();
  assert(exited, 'onExit should be called');
  assertEqual(sm.stack.length, 0);
});

test('replace swaps top scene', () => {
  const sm = new SceneManager();
  const s1 = { onEnter() {}, onExit() {} };
  const s2 = { onEnter() {} };
  sm.push(s1);
  sm.replace(s2);
  assertEqual(sm.stack.length, 1);
  assertEqual(sm.top(), s2);
});

test('update/render/touch delegate to top scene', () => {
  const sm = new SceneManager();
  let updated = false;
  let rendered = false;
  let touched = false;
  const scene = {
    onEnter() {},
    update() { updated = true; },
    render() { rendered = true; },
    onTouchStart() { touched = true; },
  };
  sm.push(scene);
  sm.update(0.016);
  sm.render({});
  sm.touchStart(0, 0);
  assert(updated, 'update should be called');
  assert(rendered, 'render should be called');
  assert(touched, 'touchStart should be called');
});

test('empty stack does not throw', () => {
  const sm = new SceneManager();
  sm.update(0.016);
  sm.render({});
  sm.touchStart(0, 0);
  assert(true, 'empty stack should be safe');
});

summary();
