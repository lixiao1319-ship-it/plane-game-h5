/**
 * 玩家飞机
 */
export class Player {
  constructor(game) {
    this.game = game;
    const cfg = game.config.player;
    const { width, height } = game.config.canvas;

    this.width = 48;
    this.height = 64;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 20;

    this.speed = cfg.speed;
    this.maxHp = cfg.maxHp;
    this.hp = this.maxHp;
    this.fireRate = cfg.fireRate;
    this.invincibleTime = cfg.invincibleTime;

    // 移动目标坐标（跟随手指）
    this._targetX = this.x;
    this._targetY = this.y;

    this._fireCooldown = 0;
    this._invincibleTimer = 0;
    this.active = true;
    this.doubleFire = false;
    this.shielded = false;
  }

  /** 设置跟随目标（由场景层传入触控位置） */
  moveTo(x, y) {
    const { width, height } = this.game.config.canvas;
    this._targetX = Math.max(0, Math.min(width - this.width, x - this.width / 2));
    this._targetY = Math.max(0, Math.min(height - this.height, y - this.height / 2));
  }

  /**
   * @returns {Array<{x,y,width,height,speed,active}>} 本帧新产生的子弹列表
   */
  update(dt) {
    // 平滑跟随
    this.x += (this._targetX - this.x) * 0.2;
    this.y += (this._targetY - this.y) * 0.2;

    // 无敌帧倒计时
    if (this._invincibleTimer > 0) this._invincibleTimer--;

    // 自动射击
    const bullets = [];
    if (this._fireCooldown > 0) {
      this._fireCooldown--;
    } else {
      this._fireCooldown = this.fireRate;
      bullets.push(...this._createBullets());
    }
    return bullets;
  }

  _createBullets() {
    const bw = 8, bh = 16;
    const cx = this.x + this.width / 2;
    const base = { width: bw, height: bh, speed: this.game.config.player.bulletSpeed, active: true };
    if (this.doubleFire) {
      return [
        { ...base, x: cx - 14 - bw / 2, y: this.y },
        { ...base, x: cx + 14 - bw / 2, y: this.y },
      ];
    }
    return [{ ...base, x: cx - bw / 2, y: this.y }];
  }

  takeDamage() {
    if (this._invincibleTimer > 0 || this.shielded) return false;
    this.hp--;
    this._invincibleTimer = this.invincibleTime;
    this.game.emit('playerHit', this.hp);
    if (this.hp <= 0) {
      this.active = false;
      this.game.emit('playerDead');
    }
    return true;
  }

  render(ctx) {
    // 无敌状态闪烁
    if (this._invincibleTimer > 0 && Math.floor(this._invincibleTimer / 5) % 2 === 0) return;

    ctx.fillStyle = '#00cfff';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // 护盾效果
    if (this.shielded) {
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width / 2 + 8,
        this.height / 2 + 8,
        0, 0, Math.PI * 2
      );
      ctx.stroke();
    }
  }
}
