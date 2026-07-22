const { fillRoundRect, strokeRoundRect, roundRect } = require('./draw');
const { drawStars, drawQualityFrame } = require('./art');
const { COLORS, RADIUS, FONT } = require('./theme');
const C = require('../data/constants');
const ImageLoader = require('../core/ImageLoader');

// Draws a compact hero card at (x,y) sized (w,h).
function drawHeroChip(ctx, hero, x, y, w, h, opts) {
  opts = opts || {};
  const rankInfo = COLORS.rank[hero.rank];

  // Card background — tinted with the hero's rank color (not a flat black),
  // so orange/purple/blue heroes are visually distinct at a glance.
  const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
  bgGrad.addColorStop(0, rankInfo.cardBg[0]);
  bgGrad.addColorStop(1, rankInfo.cardBg[1]);
  ctx.fillStyle = bgGrad;
  fillRoundRect(ctx, x, y, w, h, RADIUS.small, bgGrad);

  // Quality border + glow
  drawQualityFrame(ctx, x, y, w, h, hero.rank, RADIUS.small);

  // Rank corner badge — small colored tab in the top-left so rank reads even
  // before the portrait/border registers (helps at small chip sizes too).
  const badgeSize = 22;
  fillRoundRect(ctx, x + 6, y + 6, badgeSize, badgeSize, 6, rankInfo.main);
  ctx.fillStyle = '#1a1a2e';
  ctx.font = 'bold 13px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(rankInfo.badge, x + 6 + badgeSize / 2, y + 6 + badgeSize / 2 + 1);

  // Portrait is sized larger relative to the card than before so the art reads
  // clearly even in small grid cells.
  const portraitSize = Math.min(w - 10, h * 0.66);
  const px = x + (w - portraitSize) / 2;
  const py = y + 8;

  const portrait = ImageLoader.requestPortrait(hero.assetId);
  if (portrait.status === 'loaded') {
    ctx.save();
    roundRect(ctx, px, py, portraitSize, portraitSize, RADIUS.small);
    ctx.clip();
    drawCoverImage(ctx, portrait.image, px, py, portraitSize, portraitSize);

    // Rank-color wash over the art — ties the character into the rank
    // palette instead of leaving a plain unaccented photo in the frame.
    const tint = ctx.createLinearGradient(px, py, px, py + portraitSize);
    tint.addColorStop(0, 'rgba(0,0,0,0)');
    tint.addColorStop(0.6, 'rgba(0,0,0,0)');
    tint.addColorStop(1, rankInfo.glow);
    ctx.fillStyle = tint;
    ctx.fillRect(px, py, portraitSize, portraitSize);

    const rim = ctx.createLinearGradient(px, py, px + portraitSize, py + portraitSize);
    rim.addColorStop(0, rankInfo.dim);
    rim.addColorStop(0.5, 'rgba(0,0,0,0)');
    rim.addColorStop(1, rankInfo.dim);
    ctx.fillStyle = rim;
    ctx.fillRect(px, py, portraitSize, portraitSize);
    ctx.restore();

    // Rank-colored inner border on portrait
    ctx.strokeStyle = rankInfo.main;
    ctx.lineWidth = 2;
    roundRect(ctx, px, py, portraitSize, portraitSize, RADIUS.small);
    ctx.stroke();

    // Small rank gem accent at the bottom-right corner of the portrait.
    const gemR = 8;
    const gx = px + portraitSize - gemR - 4;
    const gy = py + portraitSize - gemR - 4;
    ctx.beginPath();
    ctx.arc(gx, gy, gemR, 0, Math.PI * 2);
    ctx.fillStyle = rankInfo.main;
    ctx.fill();
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1.5;
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

  // Stars — fit within card width
  if (opts.star !== undefined && opts.star > 0) {
    const maxStarW = w - 16;
    const starSize = Math.min(12, (maxStarW - (C.MAX_STAR - 1) * 2) / C.MAX_STAR);
    const starGap = 2;
    const totalW = C.MAX_STAR * (starSize + starGap) - starGap;
    drawStars(ctx, x + (w - totalW) / 2, py + portraitSize + 26, opts.star, C.MAX_STAR, starSize, starGap);
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
