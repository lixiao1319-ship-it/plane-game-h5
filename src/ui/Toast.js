const { fillRoundRect } = require('./draw');
const Screen = require('../core/Screen');

let message = null;
let expireAt = 0;

function show(text, durationMs) {
  message = text;
  expireAt = Date.now() + (durationMs || 1500);
}

function render(ctx) {
  if (!message || Date.now() > expireAt) return;
  ctx.font = '24px sans-serif';
  const w = Math.min(Screen.width - 40, ctx.measureText(message).width + 48);
  const x = (Screen.width - w) / 2;
  const y = Screen.height / 2 - 30;
  fillRoundRect(ctx, x, y, w, 56, 14, 'rgba(0,0,0,0.75)');
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(message, Screen.width / 2, y + 28);
}

module.exports = { show, render };
