const Screen = require('../core/Screen');
const PlayerData = require('../systems/PlayerData');

// Draws the top resource bar (gold / yuanbao / stamina) shared across scenes.
function render(ctx) {
  const s = PlayerData.state;
  const h = 64;
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(0, 0, Screen.width, h);
  ctx.font = '22px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffd24d';
  ctx.fillText(`金币 ${s.gold}`, 16, h / 2);
  ctx.fillStyle = '#7fd6ff';
  ctx.fillText(`元宝 ${s.yuanbao}`, Screen.width * 0.4, h / 2);
  ctx.fillStyle = '#8bffb0';
  ctx.fillText(`体力 ${s.stamina}/60`, Screen.width * 0.7, h / 2);
  return h;
}

module.exports = { render, HEIGHT: 64 };
