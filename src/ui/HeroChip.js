const { fillRoundRect, strokeRoundRect } = require('./draw');
const C = require('../data/constants');

// Draws a compact hero card at (x,y) sized (w,h). No art assets in this MVP,
// so the portrait is a colored rank-tinted rounded square with the hero's
// first character — cheap to render and still visually distinct per rank.
function drawHeroChip(ctx, hero, x, y, w, h, opts) {
  opts = opts || {};
  const rankInfo = C.RANK[hero.rank];
  fillRoundRect(ctx, x, y, w, h, 10, 'rgba(255,255,255,0.06)');
  strokeRoundRect(ctx, x, y, w, h, 10, rankInfo.color, 2);

  const portraitSize = Math.min(w - 16, h * 0.55);
  const px = x + (w - portraitSize) / 2;
  const py = y + 10;
  fillRoundRect(ctx, px, py, portraitSize, portraitSize, 8, rankInfo.color);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.floor(portraitSize * 0.5)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(hero.name[0], px + portraitSize / 2, py + portraitSize / 2 + 2);

  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(hero.name, x + w / 2, py + portraitSize + 20);

  if (opts.star) {
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#ffd24d';
    ctx.fillText('★'.repeat(opts.star), x + w / 2, py + portraitSize + 38);
  }

  if (opts.tag) {
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = opts.tagColor || '#8bffb0';
    ctx.fillText(opts.tag, x + w / 2, y + h - 10);
  }

  if (opts.locked) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    fillRoundRect(ctx, x, y, w, h, 10, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px sans-serif';
    ctx.fillText('未拥有', x + w / 2, y + h / 2);
  }
}

module.exports = { drawHeroChip };
