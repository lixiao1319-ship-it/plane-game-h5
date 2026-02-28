/**
 * 道具掉落
 * type: 'shield' | 'doubleFire' | 'bomb'
 */
export class PowerUp {
  constructor(game, x, y, type) {
    this.game = game;
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.speed = 2;
    this.active = true;
  }

  update() {
    this.y += this.speed;
    if (this.y > this.game.config.canvas.height) {
      this.active = false;
    }
  }

  render(ctx) {
    const colors = { shield: '#4488ff', doubleFire: '#ffaa00', bomb: '#ff4466' };
    const labels = { shield: 'S', doubleFire: '2x', bomb: 'B' };
    ctx.fillStyle = colors[this.type] || '#fff';
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labels[this.type], this.x + this.width / 2, this.y + this.height / 2);
  }
}
