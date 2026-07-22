const { roundRect } = require('./draw');
const { COLORS, RADIUS } = require('./theme');

// Draws a five-pointed star centered at (cx, cy) with outer radius r.
function drawStar(ctx, cx, cy, r, color, filled) {
  const innerR = r * 0.42;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = (Math.PI / 2) * -1 + (i * 2 * Math.PI) / 5;
    const innerAngle = outerAngle + Math.PI / 5;
    const ox = cx + r * Math.cos(outerAngle);
    const oy = cy + r * Math.sin(outerAngle);
    const ix = cx + innerR * Math.cos(innerAngle);
    const iy = cy + innerR * Math.sin(innerAngle);
    if (i === 0) ctx.moveTo(ox, oy);
    else ctx.lineTo(ox, oy);
    ctx.lineTo(ix, iy);
  }
  ctx.closePath();
  if (filled) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// Draws a row of `total` stars with `filled` lit. Returns total width.
function drawStars(ctx, x, y, filled, total, size, gap) {
  const r = size / 2;
  const spacing = size + (gap || 4);
  let cx = x + r;
  for (let i = 0; i < total; i++) {
    drawStar(ctx, cx, y + r, r, '#e8c858', i < filled);
    cx += spacing;
  }
  return total * spacing - (gap || 4);
}

// Draws a quality-themed card frame with gradient border and subtle inner glow.
function drawQualityFrame(ctx, x, y, w, h, rank, radius) {
  const r = radius || RADIUS.medium;
  const theme = COLORS.rank[rank];
  if (!theme) return;

  // Outer glow (shadow effect via gradient)
  const glowGrad = ctx.createRadialGradient(
    x + w / 2, y + h / 2, Math.min(w, h) * 0.3,
    x + w / 2, y + h / 2, Math.max(w, h) * 0.8
  );
  glowGrad.addColorStop(0, 'rgba(0,0,0,0)');
  glowGrad.addColorStop(1, theme.glow);
  ctx.fillStyle = glowGrad;
  ctx.fillRect(x - 8, y - 8, w + 16, h + 16);

  // Gradient border
  const borderGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  borderGrad.addColorStop(0, theme.gradient[0]);
  borderGrad.addColorStop(1, theme.gradient[1]);
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2.5;
  roundRect(ctx, x, y, w, h, r);
  ctx.stroke();

  // Subtle inner highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  roundRect(ctx, x + 1, y + 1, w - 2, h - 2, r - 1);
  ctx.stroke();
}

// Draws a quality badge (small label pill) at position.
function drawQualityBadge(ctx, text, x, y, rank, filled) {
  const theme = COLORS.rank[rank];
  if (!theme) return 0;
  ctx.font = 'bold 13px sans-serif';
  const w = ctx.measureText(text).width + 20;
  const h = 26;
  const r = h / 2;

  if (filled) {
    const grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, theme.gradient[0]);
    grad.addColorStop(1, theme.gradient[1]);
    ctx.fillStyle = grad;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();
    ctx.fillStyle = '#1a1a2e';
  } else {
    ctx.strokeStyle = theme.main;
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, w, h, r);
    ctx.stroke();
    ctx.fillStyle = theme.main;
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + h / 2 + 1);
  return w;
}

// Creates a vertical gradient background. Returns the gradient object.
function makeBgGradient(ctx, colorStops, width, height) {
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, colorStops[0]);
  grad.addColorStop(1, colorStops[1]);
  return grad;
}

// Draws a subtle noise/texture overlay for visual richness.
function drawNoiseOverlay(ctx, x, y, w, h, alpha) {
  const a = alpha || 0.03;
  ctx.fillStyle = `rgba(255,255,255,${a})`;
  for (let i = 0; i < 50; i++) {
    const nx = x + Math.random() * w;
    const ny = y + Math.random() * h;
    ctx.fillRect(nx, ny, 1, 1);
  }
}

// --- Chinese Fantasy decorative elements ---

// Draws a cloud-scroll (祥云) ornament at (x, y) with given width.
function drawCloudScroll(ctx, x, y, w, color) {
  const c = color || COLORS.textGold;
  ctx.strokeStyle = c;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  // Left curl
  ctx.arc(x + w * 0.15, y, w * 0.12, Math.PI * 0.5, Math.PI * 1.5);
  // Center wave
  ctx.moveTo(x + w * 0.15, y - w * 0.12);
  ctx.quadraticCurveTo(x + w * 0.4, y - w * 0.2, x + w * 0.5, y);
  ctx.quadraticCurveTo(x + w * 0.6, y + w * 0.2, x + w * 0.85, y + w * 0.12);
  // Right curl
  ctx.arc(x + w * 0.85, y, w * 0.12, Math.PI * 1.5, Math.PI * 0.5);
  ctx.stroke();
}

// Draws a decorative corner bracket (回纹角花) at (x, y) with size s.
function drawCornerBracket(ctx, x, y, s, color) {
  const c = color || COLORS.textGold;
  ctx.strokeStyle = c;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  // Top-left corner
  ctx.moveTo(x, y + s);
  ctx.lineTo(x, y);
  ctx.lineTo(x + s, y);
  // Inner step
  ctx.moveTo(x + s * 0.3, y + s);
  ctx.lineTo(x + s * 0.3, y + s * 0.3);
  ctx.lineTo(x + s, y + s * 0.3);
  ctx.stroke();
}

// Draws a horizontal divider with cloud motif.
function drawCloudDivider(ctx, x, y, w, color) {
  const c = color || COLORS.divider;
  ctx.strokeStyle = c;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.stroke();
  // Small cloud in center
  drawCloudScroll(ctx, x + w / 2 - 20, y, 40, c);
}

// Draws a panel with ink-wash border effect.
function drawInkPanel(ctx, x, y, w, h, radius) {
  const r = radius || RADIUS.medium;
  // Dark base
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
  // Gold-ish border
  ctx.strokeStyle = 'rgba(212,175,55,0.25)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, h, r);
  ctx.stroke();
  // Corner accents
  drawCornerBracket(ctx, x, y, 12);
  drawCornerBracket(ctx, x + w - 12, y, 12);
  drawCornerBracket(ctx, x, y + h - 12, 12);
  drawCornerBracket(ctx, x + w - 12, y + h - 12, 12);
}

module.exports = {
  drawStar,
  drawStars,
  drawQualityFrame,
  drawQualityBadge,
  makeBgGradient,
  drawNoiseOverlay,
  drawCloudScroll,
  drawCornerBracket,
  drawCloudDivider,
  drawInkPanel,
};
