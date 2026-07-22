const { fillRoundRect, strokeRoundRect, roundRect } = require('./draw');
const { drawStars, drawQualityFrame } = require('./art');
const { COLORS, RADIUS, FONT } = require('./theme');
const C = require('../data/constants');
const ImageLoader = require('../core/ImageLoader');

// Draws a compact hero card at (x,y) sized (w,h).
function drawHeroChip(ctx, hero, x, y, w, h, opts) {
  opts = opts || {};
  const rankInfo = COLORS.rank[hero.rank];

  // Card background — dark ink with subtle gradient
  const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
  bgGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
  bgGrad.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = bgGrad;
  fillRoundRect(ctx, x, y, w, h, RADIUS.small, bgGrad);

  // Quality border + glow
  drawQualityFrame(ctx, x, y, w, h, hero.rank, RADIUS.small);

  const portraitSize = Math.min(w - 16, h * 0.55);
  const px = x + (w - portraitSize) / 2;
  const py = y + 10;

  const portrait = ImageLoader.requestPortrait(hero.assetId);
  if (portrait.status === 'loaded') {
    ctx.save();
    roundRect(ctx, px, py, portraitSize, portraitSize, RADIUS.small);
    ctx.clip();
    drawCoverImage(ctx, portrait.image, px, py, portraitSize, portraitSize);
    ctx.restore();
    // Gold inner border on portrait
    ctx.strokeStyle = 'rgba(212,175,55,0.5)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, px, py, portraitSize, portraitSize, RADIUS.small);
    ctx.stroke();
  } else {
    // Placeholder with rank gradient
    const phGrad = ctx.createLinearGradient(px, py, px, py + portraitSize);
    phGrad.addColorStop(0, rankInfo.gradient[0]);
    phGrad.addColorStop(1, rankInfo.gradient[1]);
    ctx.fillStyle = phGrad;
    fillRoundRect(ctx, px, py, portraitSize, portraitSize, RADIUS.small, phGrad);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = `bold ${Math.floor(portraitSize * 0.45)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hero.name[0], px + portraitSize / 2, py + portraitSize / 2 + 2);
  }

  // Name — golden serif
  ctx.font = `bold 15px serif`;
  ctx.fillStyle = COLORS.textGold;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(hero.name, x + w / 2, py + portraitSize + 18);

  // Stars
  if (opts.star !== undefined && opts.star > 0) {
    const starSize = 13;
    const starGap = 2;
    const totalW = opts.star * (starSize + starGap) - starGap;
    drawStars(ctx, x + (w - totalW) / 2, py + portraitSize + 28, opts.star, C.MAX_STAR, starSize, starGap);
  }

  // Tag
  if (opts.tag) {
    ctx.font = `bold 12px sans-serif`;
    ctx.fillStyle = opts.tagColor || COLORS.textGreen;
    ctx.fillText(opts.tag, x + w / 2, y + h - 10);
  }

  // Locked overlay
  if (opts.locked) {
    fillRoundRect(ctx, x, y, w, h, RADIUS.small, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '14px serif';
    ctx.fillText('未拥有', x + w / 2, y + h / 2);
  }
}

function drawCoverImage(ctx, image, dx, dy, dw, dh) {
  const iw = image.width;
  const ih = image.height;
  const scale = Math.max(dw / iw, dh / ih);
  const sw = dw / scale;
  const sh = dh / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}

module.exports = { drawHeroChip };
