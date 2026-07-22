const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const { drawCloudScroll, drawCloudDivider } = require('../ui/art');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');

function createHomeScene(sceneManager) {
  let buttons = [];

  return {
    onEnter() {
      const w = Screen.width - 80;
      const x = 40;
      let y = Screen.height * 0.38;
      const gap = SPACING.lg;
      const h = 68;
      buttons = [
        new Button({
          x, y, w, h,
          text: '金币召唤',
          gradient: ['#c88820', '#a06810'],
          onTap: () => {
            const GachaScene = require('./GachaScene');
            sceneManager.push(GachaScene(sceneManager));
          },
        }),
        new Button({
          x, y: y + (h + gap), w, h,
          text: '我的武将',
          gradient: ['#58a858', '#387038'],
          onTap: () => {
            const MyHeroesScene = require('./MyHeroesScene');
            sceneManager.push(MyHeroesScene(sceneManager));
          },
        }),
        new Button({
          x, y: y + (h + gap) * 2, w, h,
          text: '武将图鉴',
          gradient: ['#3870b8', '#285090'],
          onTap: () => {
            const RosterScene = require('./RosterScene');
            sceneManager.push(RosterScene(sceneManager));
          },
        }),
      ];
    },
    update(dt) {
      buttons.forEach((b) => b.update(dt));
      Toast.update(dt);
    },
    render(ctx) {
      // Deep indigo gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, COLORS.bgHome[0]);
      grad.addColorStop(1, COLORS.bgHome[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      // Decorative top cloud scroll
      drawCloudScroll(ctx, Screen.width / 2 - 100, 80, 200, 'rgba(212,175,55,0.3)');

      // Title — large golden characters
      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.textGold;
      ctx.font = 'bold 44px serif';
      ctx.fillText('三国·乱世雄主', Screen.width / 2, Screen.height * 0.22);

      // Subtitle
      ctx.font = '16px serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.fillText('MVP 抽卡·养成 试玩版', Screen.width / 2, Screen.height * 0.22 + 36);

      // Cloud divider under title
      drawCloudDivider(ctx, Screen.width / 2 - 60, Screen.height * 0.22 + 56, 120);

      // Bottom decorative clouds
      drawCloudScroll(ctx, 40, Screen.height - 100, 120, 'rgba(212,175,55,0.15)');
      drawCloudScroll(ctx, Screen.width - 160, Screen.height - 80, 120, 'rgba(212,175,55,0.15)');

      buttons.forEach((b) => b.render(ctx));
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchStart(x, y) {
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchEnd(x, y) {
      buttons.forEach((b) => b.handleTouchEnd(x, y));
    },
    onResume() {},
  };
}

module.exports = createHomeScene;
