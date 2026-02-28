/**
 * 敌机
 * type: 'small' | 'medium' | 'boss'
 */
export class Enemy {
  constructor(game, type = 'small') {
    this.game = game;
    this.type = type;
    const cfg = game.config.enemy[type];

    this.width = type === 'boss' ? 96 : type === 'medium' ? 60 : 40;
    this.height = type === 'boss' ? 80 : type === 'medium' ? 50 : 36;

    const canvasW = game.config.canvas.width;
    this.x = Math.random() * (canvasW - this.width);
    this.y = -this.height;

    this.hp = cfg.hp;
    this.maxHp = cfg.hp;
    this.speed = cfg.speed;
    this.score = cfg.score;
    this.active = true;
  }

  update(dt) {
    this.y += this.speed;
    // 飞出屏幕底部则回收
    if (this.y > this.game.config.canvas.height) {
      this.active = false;
    }
  }

  takeDamage(dmg = 1) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.active = false;
      this.game.emit('enemyDestroyed', this);
    }
  }

  render(ctx) {
    const colors = { small: '#ff4444', medium: '#ff8800', boss: '#cc00ff' };
    ctx.fillStyle = colors[this.type] || '#ff4444';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // boss 血条
    if (this.type === 'boss') {
      const barW = this.width;
      const barH = 6;
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x, this.y - 10, barW, barH);
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(this.x, this.y - 10, barW * (this.hp / this.maxHp), barH);
    }
  }
}
