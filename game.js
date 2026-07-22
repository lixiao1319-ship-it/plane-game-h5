// WeChat mini-game entry point. Sets up the shared canvas, scene stack, main
// loop and touch routing, then boots into the home screen.

const Screen = require('./src/core/Screen');
const SceneManager = require('./src/core/SceneManager');
const PlayerData = require('./src/systems/PlayerData');
const createHomeScene = require('./src/scenes/HomeScene');

const info = wx.getSystemInfoSync();
Screen.width = info.windowWidth;
Screen.height = info.windowHeight;
Screen.dpr = info.pixelRatio || 1;

const canvas = wx.createCanvas();
canvas.width = Screen.width * Screen.dpr;
canvas.height = Screen.height * Screen.dpr;
const ctx = canvas.getContext('2d');
ctx.scale(Screen.dpr, Screen.dpr);

PlayerData.load();

const sceneManager = new SceneManager();
sceneManager.push(createHomeScene(sceneManager));

wx.onTouchStart((e) => {
  const t = e.touches[0];
  sceneManager.touchStart(t.clientX, t.clientY);
});
wx.onTouchMove((e) => {
  const t = e.touches[0];
  sceneManager.touchMove(t.clientX, t.clientY);
});
wx.onTouchEnd((e) => {
  const t = e.changedTouches[0];
  sceneManager.touchEnd(t.clientX, t.clientY);
});

// --- Frame timing with dt clamping -----------------------------------------
// Max dt of 100ms prevents physics/animation explosion after backgrounding.
// If a frame takes longer than 33ms we also dampen the next dt to avoid
// runaway slow-motion on weak devices.
const MAX_DT = 0.1; // 100 ms
const FRAME_BUDGET = 33; // ~30 fps budget per frame

let lastTs = Date.now();
let frameDebt = 0;

function loop() {
  const frameStart = Date.now();
  let dt = (frameStart - lastTs) / 1000;
  lastTs = frameStart;

  // Clamp dt so a long pause doesn't teleport animations
  if (dt > MAX_DT) dt = MAX_DT;

  // Apply frame debt from previous slow frames (reduces dt to compensate)
  if (frameDebt > 0) {
    const reduction = Math.min(dt, frameDebt);
    dt -= reduction;
    frameDebt -= reduction;
  }

  sceneManager.update(dt);

  ctx.clearRect(0, 0, Screen.width, Screen.height);
  sceneManager.render(ctx);

  // Track how long this frame took; if over budget, carry debt forward
  const frameTime = Date.now() - frameStart;
  if (frameTime > FRAME_BUDGET) {
    frameDebt = Math.min(0.05, (frameTime - FRAME_BUDGET) / 1000);
  } else {
    frameDebt = 0;
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
