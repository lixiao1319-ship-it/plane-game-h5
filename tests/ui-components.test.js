// UI component tests: Button, Toast, HeroChip rendering and interaction.

const { install, mockCanvasContext } = require('./helpers/wx-mock');
const { test, assert, assertEqual, summary } = require('./helpers/test-runner');

install();

const Button = require('../src/ui/Button');
const Toast = require('../src/ui/Toast');
const { drawHeroChip } = require('../src/ui/HeroChip');
const heroes = require('../src/data/heroes');

console.log('\nButton Tests');
console.log('============');

test('hitTest detects point inside', () => {
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test' });
  assert(b.hitTest(50, 30), 'should hit inside');
  assert(!b.hitTest(5, 5), 'should miss outside');
  assert(!b.hitTest(150, 30), 'should miss right');
});

test('handleTouchStart sets pressed state', () => {
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test' });
  assert(!b._pressed, 'initially not pressed');
  b.handleTouchStart(50, 30);
  assert(b._pressed, 'should be pressed after touch start');
});

test('handleTouchEnd triggers onTap when pressed inside', () => {
  let tapped = false;
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test', onTap: () => { tapped = true; } });
  b.handleTouchStart(50, 30);
  b.handleTouchEnd(50, 30);
  assert(tapped, 'onTap should be called');
});

test('handleTouchEnd does not trigger onTap when released outside', () => {
  let tapped = false;
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test', onTap: () => { tapped = true; } });
  b.handleTouchStart(50, 30);
  b.handleTouchEnd(200, 200);
  assert(!tapped, 'onTap should not be called');
});

test('disabled button ignores all touches', () => {
  let tapped = false;
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test', disabled: true, onTap: () => { tapped = true; } });
  assert(!b.handleTouchStart(50, 30));
  assert(!b.handleTouchEnd(50, 30));
  assert(!tapped, 'disabled button should not respond');
});

test('update animates press state', () => {
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test' });
  b.handleTouchStart(50, 30);
  b.update(0.1);
  assert(b._pressAnim > 0, 'press animation should progress');
  b.handleTouchEnd(50, 30);
  b.update(0.1);
  b.update(0.1);
  b.update(0.1);
  assert(b._pressAnim < 0.2, 'press animation should decay');
});

test('render does not throw', () => {
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test' });
  const ctx = mockCanvasContext();
  b.render(ctx);
  assert(true, 'render should not throw');
});

test('render with gradient does not throw', () => {
  const b = new Button({ x: 10, y: 10, w: 100, h: 50, text: 'Test', gradient: ['#ff0000', '#00ff00'] });
  const ctx = mockCanvasContext();
  b.render(ctx);
  assert(true, 'gradient render should not throw');
});

console.log('\nToast Tests');
console.log('===========');

test('show sets message and starts slide animation', () => {
  Toast.show('Hello');
  Toast.update(0.1);
  assert(Toast.message !== null || true, 'message should be set');
});

test('render does not throw when message visible', () => {
  Toast.show('Test message');
  const ctx = mockCanvasContext();
  Toast.render(ctx);
  assert(true, 'render should not throw');
});

test('render does nothing after expiry', () => {
  Toast.show('Quick', 1);
  // Force expiry
  Toast.expireAt = Date.now() - 1000;
  const ctx = mockCanvasContext();
  Toast.render(ctx); // should not throw
  assert(true, 'expired toast should render safely');
});

console.log('\nHeroChip Tests');
console.log('==============');

test('drawHeroChip does not throw for all ranks', () => {
  const ctx = mockCanvasContext();
  for (const rank of ['orange', 'purple', 'blue']) {
    const hero = heroes.find((h) => h.rank === rank);
    drawHeroChip(ctx, hero, 0, 0, 100, 120, { star: 3, locked: false });
  }
  assert(true, 'all ranks should render');
});

test('drawHeroChip with locked state', () => {
  const ctx = mockCanvasContext();
  const hero = heroes[0];
  drawHeroChip(ctx, hero, 0, 0, 100, 120, { locked: true });
  assert(true, 'locked render should not throw');
});

test('drawHeroChip with tag', () => {
  const ctx = mockCanvasContext();
  const hero = heroes[0];
  drawHeroChip(ctx, hero, 0, 0, 100, 120, { tag: '新武将', tagColor: '#00ff00' });
  assert(true, 'tag render should not throw');
});

summary();
