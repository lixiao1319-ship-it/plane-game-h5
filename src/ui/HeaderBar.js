const Screen = require('../core/Screen');
const PlayerData = require('../systems/PlayerData');
const { COLORS, FONT } = require('./theme');

// Draws the top resource bar (gold / yuanbao / stamina) shared across scenes.
function render(ctx) {
  const s = PlayerData.state;
  const h = 64;

  // Dark semi-transparent bar with gold bottom border
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, Screen.width, h);
  ctx.fillStyle = 'rgba(212,175,55,0.3)';
  ctx.fillRect(0, h - 1, Screen.width, 1);

  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  // Gold
  ctx.fillStyle = COLORS.textGold;
  ctx.fillText(`金币 ${s.gold}`, 16, h / 2);

  // Yuanbao
  ctx.fillStyle = COLORS.textBlue;
  ctx.fillText(`元宝 ${s.yuanbao}`, Screen.width * 0.38, h / 2);

  // Stamina
  ctx.fillStyle = COLORS.textGreen;
  ctx.fillText(`体力 ${s.stamina}/60`, Screen.width * 0.68, h / 2);

  return h;
}

module.exports = { render, HEIGHT: 64 };
