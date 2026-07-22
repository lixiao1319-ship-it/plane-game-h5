const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const { drawHeroChip } = require('../ui/HeroChip');
const { drawInkPanel, drawCloudDivider } = require('../ui/art');
const { roundRect } = require('../ui/draw');
const GachaSystem = require('../systems/GachaSystem');
const PlayerData = require('../systems/PlayerData');
const ImageLoader = require('../core/ImageLoader');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');
const C = require('../data/constants');

function createGachaScene(sceneManager) {
  let buttons = [];
  const featured = GachaSystem.pools.orange.slice(0, 4);
  let featuredRects = [];

  function layout() {
    const w = (Screen.width - 32 - 16) / 2;
    const y = Screen.height - 140;
    const h = 68;
    buttons = [
      new Button({
        x: 16, y, w, h,
        text: `单抽 (${C.GACHA.costPerDraw}金)`,
        gradient: ['#c88820', '#a06810'],
        onTap: () => doDraw(1),
      }),
      new Button({
        x: 16 + w + 16, y, w, h,
        text: `十连 (${C.GACHA.tenDrawCost}金)`,
        gradient: ['#b03030', '#801818'],
        onTap: () => doDraw(10),
      }),
      new Button({
        x: 16, y: Screen.height - 48, w: 80, h: 32,
        text: '返回',
        bg: 'rgba(255,255,255,0.12)',
        fontSize: 16,
        onTap: () => sceneManager.pop(),
      }),
    ];
  }

  function doDraw(count) {
    const result = GachaSystem.draw(count);
    if (!result) {
      Toast.show('金币不足');
      return;
    }
    const GachaResultScene = require('./GachaResultScene');
    sceneManager.push(GachaResultScene(sceneManager, result.results));
  }

  return {
    onEnter() {
      layout();
      ImageLoader.preloadPortraits(featured);
    },
    onResume() {
      layout();
    },
    update(dt) {
      buttons.forEach((b) => b.update(dt));
      Toast.update(dt);
    },
    render(ctx) {
      // Background
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, COLORS.bgGacha[0]);
      grad.addColorStop(1, COLORS.bgGacha[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      // Title
      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.textGold;
      ctx.font = 'bold 28px serif';
      ctx.fillText('金币召唤', Screen.width / 2, 95);

      drawCloudDivider(ctx, Screen.width / 2 - 50, 115, 100);

      // Rate info panel with ink-wash style
      const g = PlayerData.state.gacha;
      const panelX = 20;
      const panelW = Screen.width - 40;
      const panelY = 135;
      const panelH = 60;

      drawInkPanel(ctx, panelX, panelY, panelW, panelH, RADIUS.small);

      ctx.font = '13px sans-serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.fillText(
        `橙色概率 ${(g.orangeRate * 100).toFixed(1)}%（未出橙色每抽+0.4%，${C.GACHA.orangePity}抽保底）`,
        Screen.width / 2,
        panelY + 22
      );
      ctx.fillText(
        `距下次紫色保底 ${Math.max(0, C.GACHA.purplePity - g.sincePurpleOrAbove)} 抽`,
        Screen.width / 2,
        panelY + 42
      );

      // Featured heroes section
      ctx.font = '13px serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.fillText('— 传说武将 · 点击详情 —', Screen.width / 2, 215);

      const chipW = (Screen.width - 32 - 3 * 12) / 4;
      const chipH = 145;
      featuredRects = featured.map((hero, i) => {
        const x = 16 + i * (chipW + 12);
        drawHeroChip(ctx, hero, x, 225, chipW, chipH);
        return { x, y: 225, w: chipW, h: chipH, hero };
      });

      buttons.forEach((b) => b.render(ctx));
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchStart(x, y) {
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchEnd(x, y) {
      for (const b of buttons) if (b.handleTouchEnd(x, y)) return;
      const hit = featuredRects.find(
        (r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h
      );
      if (hit) {
        const HeroDetailScene = require('./HeroDetailScene');
        sceneManager.push(HeroDetailScene(sceneManager, hit.hero));
      }
    },
  };
}

module.exports = createGachaScene;
