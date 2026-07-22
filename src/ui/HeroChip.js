const { fillRoundRect, strokeRoundRect, roundRect } = require('./draw');
const C = require('../data/constants');
const ImageLoader = require('../core/ImageLoader');

// Draws a compact hero card at (x,y) sized (w,h). Portrait art is optional and
// swappable at runtime: if assets/portraits/<heroId>.(png|jpg|jpeg) exists it
// is drawn (cropped to a rounded square); otherwise falls back to a colored
// rank-tinted placeholder with the hero's first character.
function drawHeroChip(ctx, hero, x, y, w, h, opts) {
  opts = opts || {};
  const rankInfo = C.RANK[hero.rank];
  fillRoundRect(ctx, x, y, w, h, 10, 'rgba(255,255,255,0.06)');
  strokeRoundRect(ctx, x, y, w, h, 10, rankInfo.color, 2);

  const portraitSize = Math.min(w - 16, h * 0.55);
  const px = x + (w - portraitSize) / 2;
  const py = y + 10;

  const portrait = ImageLoader.requestPortrait(hero.id);
  if (portrait.status === 'loaded') {
    ctx.save();
    roundRect(ctx, px, py, portraitSize, portraitSize, 8);
    ctx.clip();
    drawCoverImage(ctx, portrait.image, px, py, portraitSize, portraitSize);
    ctx.restore();
    strokeRoundRect(ctx, px, py, portraitSize, portraitSize, 8, rankInfo.color, 2);
  } else {
    fillRoundRect(ctx, px, py, portraitSize, portraitSize, 8, rankInfo.color);
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.floor(portraitSize * 0.5)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hero.name[0], px + portraitSize / 2, py + portraitSize / 2 + 2);
  }

  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
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
    fillRoundRect(ctx, x, y, w, h, 10, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px sans-serif';
    ctx.fillText('未拥有', x + w / 2, y + h / 2);
  }
}

// Draws `image` into the (dx,dy,dw,dh) box using center-crop (CSS object-fit:
// cover semantics) so portraits of any source aspect ratio fill the square.
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
