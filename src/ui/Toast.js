const { fillRoundRect, roundRect } = require('./draw');
const Screen = require('../core/Screen');
const { COLORS, FONT } = require('./theme');

let message = null;
let expireAt = 0;
let slideY = -60;
let targetY = -60;

function show(text, durationMs) {
  message = text;
  expireAt = Date.now() + (durationMs || 1800);
  targetY = 80;
}

function hide() {
  targetY = -60;
}

function update(dt) {
  const speed = 8;
  slideY += (targetY - slideY) * Math.min(1, speed * dt);
  if (Date.now() > expireAt && targetY > 0) {
    hide();
  }
}

function render(ctx) {
  if (!message || slideY < -50) return;

  ctx.font = 'bold 15px serif';
  const w = Math.min(Screen.width - 40, ctx.measureText(message).width + 48);
  const x = (Screen.width - w) / 2;
  const y = slideY;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  fillRoundRect(ctx, x + 2, y + 3, w, 48, 12, 'rgba(0,0,0,0.3)');

  // Body — dark with gold border
  ctx.fillStyle = 'rgba(20,20,35,0.9)';
  fillRoundRect(ctx, x, y, w, 48, 12, 'rgba(20,20,35,0.9)');
  ctx.strokeStyle = 'rgba(212,175,55,0.4)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, 48, 12);
  ctx.stroke();

  ctx.fillStyle = COLORS.textPrimary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(message, Screen.width / 2, y + 24);
}

module.exports = { show, hide, update, render };
