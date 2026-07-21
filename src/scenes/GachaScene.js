const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const { drawHeroChip } = require('../ui/HeroChip');
const GachaSystem = require('../systems/GachaSystem');
const PlayerData = require('../systems/PlayerData');
const C = require('../data/constants');

function createGachaScene(sceneManager) {
  let buttons = [];
  const featured = GachaSystem.pools.orange.slice(0, 4);

  function layout() {
    const w = (Screen.width - 32 - 16) / 2;
    const y = Screen.height - 140;
    const h = 88;
    buttons = [
      new Button({
        x: 16, y, w, h,
        text: `单抽 (${C.GACHA.costPerDraw}金)`,
        bg: '#e0842f',
        onTap: () => doDraw(1),
      }),
      new Button({
        x: 16 + w + 16, y, w, h,
        text: `十连 (${C.GACHA.tenDrawCost}金)`,
        bg: '#c23a3a',
        onTap: () => doDraw(10),
      }),
      new Button({
        x: 16, y: Screen.height - 40, w: 80, h: 32,
        text: '返回',
        bg: '#555',
        fontSize: 18,
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
    },
    onResume() {
      layout();
    },
    update() {},
    render(ctx) {
      ctx.fillStyle = '#1a1030';
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffdca6';
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText('金币召唤', Screen.width / 2, 110);

      const g = PlayerData.state.gacha;
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#cfc3ff';
      ctx.fillText(
        `橙色概率 ${(g.orangeRate * 100).toFixed(1)}%（未出橙色每抽+0.4%，${C.GACHA.orangePity}抽保底）`,
        Screen.width / 2,
        145
      );
      ctx.fillText(
        `距下次紫色保底 ${Math.max(0, C.GACHA.purplePity - g.sincePurpleOrAbove)} 抽`,
        Screen.width / 2,
        170
      );

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#8f86c9';
      ctx.fillText('传说武将（部分展示）', Screen.width / 2, 210);
      const chipW = (Screen.width - 32 - 3 * 12) / 4;
      const chipH = 130;
      featured.forEach((hero, i) => {
        const x = 16 + i * (chipW + 12);
        drawHeroChip(ctx, hero, x, 225, chipW, chipH);
      });

      buttons.forEach((b) => b.render(ctx));
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchEnd(x, y) {
      for (const b of buttons) if (b.handleTap(x, y)) break;
    },
  };
}

module.exports = createGachaScene;
