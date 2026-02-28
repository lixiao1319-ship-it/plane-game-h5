/**
 * 玩家飞机 — Canvas 矢量绘制
 */
export class Player {
  constructor(game) {
    this.game = game;
    const cfg = game.config.player;
    const { width, height } = game.config.canvas;

    this.width = 44;
    this.height = 56;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 24;

    this.maxHp = cfg.maxHp;
    this.hp = this.maxHp;
    this.fireRate = cfg.fireRate;
    this.bulletSpeed = cfg.bulletSpeed;
    this.invincibleTime = cfg.invincibleTime;

    this._targetX = this.x;
    this._targetY = this.y;
    this._fireCooldown = 0;
    this._invincibleTimer = 0;
    this._flameFrame = 0;

    this.active = true;
    this.doubleFire = false;
    this.shielded = false;
  }

  moveTo(x, y) {
    const { width, height } = this.game.config.canvas;
    this._targetX = Math.max(0, Math.min(width - this.width, x - this.width / 2));
    this._targetY = Math.max(0, Math.min(height - this.height, y - this.height / 2));
  }

  update() {
    this.x += (this._targetX - this.x) * 0.25;
    this.y += (this._targetY - this.y) * 0.25;

    this._flameFrame++;
    if (this._invincibleTimer > 0) this._invincibleTimer--;

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
    const cx = this.x + this.width / 2;
    const speed = this.bulletSpeed;
    const bw = 6, bh = 14;
    if (this.doubleFire) {
      return [
        { x: cx - 13, y: this.y + 6, speed, active: true, width: bw, height: bh },
        { x: cx + 7,  y: this.y + 6, speed, active: true, width: bw, height: bh },
      ];
    }
    return [{ x: cx - bw / 2, y: this.y + 4, speed, active: true, width: bw, height: bh }];
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
    if (this._invincibleTimer > 0 && Math.floor(this._invincibleTimer / 4) % 2 === 0) return;

    const cx = Math.round(this.x + this.width / 2);
    const cy = Math.round(this.y + this.height / 2);
    const hw = this.width / 2;
    const hh = this.height / 2;

    ctx.save();
    ctx.translate(cx, cy);

    // 尾焰
    const flicker = Math.sin(this._flameFrame * 0.45) * 3;
    const fh = 16 + flicker;
    const grad = ctx.createLinearGradient(0, hh - 4, 0, hh + fh);
    grad.addColorStop(0, 'rgba(255,220,80,0.95)');
    grad.addColorStop(0.5, 'rgba(255,100,0,0.7)');
    grad.addColorStop(1, 'rgba(255,40,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-8, hh - 6);
    ctx.quadraticCurveTo(0, hh + fh, 8, hh - 6);
    ctx.closePath();
    ctx.fill();

    // 机翼（双侧三角）
    ctx.fillStyle = '#0099cc';
    ctx.beginPath();
    ctx.moveTo(-hw, hh * 0.3);
    ctx.lineTo(-hw * 0.3, -hh * 0.1);
    ctx.lineTo(-hw * 0.3, hh * 0.55);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(hw, hh * 0.3);
    ctx.lineTo(hw * 0.3, -hh * 0.1);
    ctx.lineTo(hw * 0.3, hh * 0.55);
    ctx.closePath();
    ctx.fill();

    // 机身
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.moveTo(0, -hh);              // 机头
    ctx.lineTo(hw * 0.55, hh * 0.2);
    ctx.lineTo(hw * 0.3, hh);
    ctx.lineTo(-hw * 0.3, hh);
    ctx.lineTo(-hw * 0.55, hh * 0.2);
    ctx.closePath();
    ctx.fill();

    // 机身高光
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.moveTo(0, -hh * 0.9);
    ctx.lineTo(hw * 0.2, hh * 0.1);
    ctx.lineTo(0, hh * 0.2);
    ctx.lineTo(-hw * 0.2, hh * 0.1);
    ctx.closePath();
    ctx.fill();

    // 驾驶舱
    ctx.fillStyle = '#001a3a';
    ctx.beginPath();
    ctx.ellipse(0, -hh * 0.2, 6, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(100,200,255,0.4)';
    ctx.beginPath();
    ctx.ellipse(-1, -hh * 0.25, 3, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // 护盾
    if (this.shielded) {
      ctx.strokeStyle = 'rgba(100,220,255,0.8)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00cfff';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.ellipse(0, 0, hw + 10, hh + 10, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }
}
