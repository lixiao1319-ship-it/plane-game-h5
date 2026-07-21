const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');

function createHomeScene(sceneManager) {
  let buttons = [];

  return {
    onEnter() {
      const w = Screen.width - 80;
      const x = 40;
      let y = Screen.height * 0.42;
      const gap = 24;
      const h = 76;
      buttons = [
        new Button({
          x, y, w, h,
          text: '金币召唤',
          bg: '#e0842f',
          onTap: () => {
            const GachaScene = require('./GachaScene');
            sceneManager.push(GachaScene(sceneManager));
          },
        }),
        new Button({
          x, y: y + (h + gap), w, h,
          text: '武将图鉴',
          bg: '#3a6ff0',
          onTap: () => {
            const RosterScene = require('./RosterScene');
            sceneManager.push(RosterScene(sceneManager));
          },
        }),
      ];
      y += (h + gap) * 2;
    },
    update() {},
    render(ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, '#1c1440');
      grad.addColorStop(1, '#3a1f1f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffdca6';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('三国·乱世雄主', Screen.width / 2, Screen.height * 0.22);
      ctx.font = '22px sans-serif';
      ctx.fillStyle = '#cfc3ff';
      ctx.fillText('MVP 抽卡·养成 试玩版', Screen.width / 2, Screen.height * 0.22 + 40);

      buttons.forEach((b) => b.render(ctx));
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchStart() {},
    onTouchEnd(x, y) {
      for (const b of buttons) if (b.handleTap(x, y)) break;
    },
    onResume() {},
  };
}

module.exports = createHomeScene;
