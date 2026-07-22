const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const { drawHeroChip } = require('../ui/HeroChip');
const { drawCloudDivider } = require('../ui/art');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');
const C = require('../data/constants');

function createGachaResultScene(sceneManager, results) {
  let buttons = [];
  let animTimer = 0;

  return {
    onEnter() {
      animTimer = 0;
      buttons = [
        new Button({
          x: Screen.width / 2 - 100,
          y: Screen.height - 90,
          w: 200,
          h: 56,
          text: '确定',
          gradient: ['#c88820', '#a06810'],
          onTap: () => sceneManager.pop(),
        }),
      ];
    },
    update(dt) {
      animTimer += dt;
      buttons.forEach((b) => b.update(dt));
    },
    render(ctx) {
      // Background
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, COLORS.bgResult[0]);
      grad.addColorStop(1, COLORS.bgResult[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      // Title
      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.textGold;
      ctx.font = 'bold 26px serif';
      ctx.fillText('召唤结果', Screen.width / 2, 50);

      drawCloudDivider(ctx, Screen.width / 2 - 50, 70, 100);

      const cols = results.length > 1 ? 5 : 1;
      const rows = Math.ceil(results.length / cols);
      const chipW = Math.min(125, (Screen.width - 32 - (cols - 1) * 12) / cols);
      const chipH = 150;
      const gridW = cols * chipW + (cols - 1) * 12;
      const startX = (Screen.width - gridW) / 2;
      const startY = 90;

      results.forEach((r, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (chipW + 12);
        const y = startY + row * (chipH + 12);

        // Staggered fade-in with scale
        const delay = i * 0.06;
        const t = Math.max(0, Math.min(1, (animTimer - delay) / 0.35));
        const eased = 1 - Math.pow(1 - t, 3);
        const scale = 0.6 + eased * 0.4;
        const alpha = eased;

        ctx.save();
        ctx.globalAlpha = alpha;
        const cx = x + chipW / 2;
        const cy = y + chipH / 2;
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);
        ctx.translate(-cx, -cy);

        const tag = r.isNew ? '新武将' : `+${r.shardsGained}碎片`;
        const tagColor = r.isNew ? COLORS.textGreen : COLORS.textYellow;
        drawHeroChip(ctx, r.hero, x, y, chipW, chipH, { tag, tagColor });

        ctx.restore();
      });

      buttons.forEach((b) => b.render(ctx));
    },
    onTouchStart(x, y) {
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchEnd(x, y) {
      buttons.forEach((b) => b.handleTouchEnd(x, y));
    },
  };
}

module.exports = createGachaResultScene;
