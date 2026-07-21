const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const { drawHeroChip } = require('../ui/HeroChip');
const C = require('../data/constants');

function createGachaResultScene(sceneManager, results) {
  let buttons = [];

  return {
    onEnter() {
      buttons = [
        new Button({
          x: Screen.width / 2 - 100,
          y: Screen.height - 100,
          w: 200,
          h: 64,
          text: '确定',
          onTap: () => sceneManager.pop(),
        }),
      ];
    },
    update() {},
    render(ctx) {
      ctx.fillStyle = '#100a20';
      ctx.fillRect(0, 0, Screen.width, Screen.height);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffdca6';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('召唤结果', Screen.width / 2, 60);

      const cols = results.length > 1 ? 5 : 1;
      const rows = Math.ceil(results.length / cols);
      const chipW = Math.min(140, (Screen.width - 32 - (cols - 1) * 12) / cols);
      const chipH = 150;
      const gridW = cols * chipW + (cols - 1) * 12;
      const startX = (Screen.width - gridW) / 2;
      const startY = 90;

      results.forEach((r, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (chipW + 12);
        const y = startY + row * (chipH + 12);
        const tag = r.isNew ? '新武将' : `+${r.shardsGained}碎片`;
        const tagColor = r.isNew ? '#8bffb0' : '#ffd24d';
        drawHeroChip(ctx, r.hero, x, y, chipW, chipH, { tag, tagColor });
      });

      buttons.forEach((b) => b.render(ctx));
    },
    onTouchEnd(x, y) {
      for (const b of buttons) if (b.handleTap(x, y)) break;
    },
  };
}

module.exports = createGachaResultScene;
