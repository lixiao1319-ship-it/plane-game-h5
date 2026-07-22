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

let lastTs = Date.now();
function loop() {
  const now = Date.now();
  const dt = (now - lastTs) / 1000;
  lastTs = now;
  sceneManager.update(dt);
  ctx.clearRect(0, 0, Screen.width, Screen.height);
  sceneManager.render(ctx);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
