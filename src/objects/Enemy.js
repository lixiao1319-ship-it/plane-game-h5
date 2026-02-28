/**
 * 敌机 — Canvas 矢量绘制
 * type: 'small' | 'medium' | 'boss'
 */
export class Enemy {
  constructor(game, type = 'small') {
    this.game = game;
    this.type = type;
    const cfg = game.config.enemy[type];
    const canvasW = game.config.canvas.width;

    this.width  = type === 'boss' ? 88 : type === 'medium' ? 58 : 38;
    this.height = type === 'boss' ? 72 : type === 'medium' ? 48 : 32;

    this.x = Math.random() * (canvasW - this.width);
    this.y = -this.height;

    this.hp = cfg.hp;
    this.maxHp = cfg.hp;
    this.speed = cfg.speed;
    this.score = cfg.score;
    this.active = true;

    // 弹幕射击冷却
    this._shootCooldown = type === 'boss'   ? 60
                        : type === 'medium' ? 120
                        : 0; // small 不射击

    // boss 左右摇摆
    this._swayAngle = Math.random() * Math.PI * 2;
    this._swaySpeed = 0.03;
    this._swayAmp   = 60;
    this._baseX     = this.x;
    this._flameFrame = 0;
    // boss 入场后才开始摇摆
    this._entered = false;
  }

  /**
   * @returns {Array|null} 本帧产生的敌方子弹数据（或 null）
   */
  update() {
    this._flameFrame++;
    const canvasH = this.game.config.canvas.height;

    if (this.type === 'boss') {
      // 向下移动直到入场位置，之后左右摇摆
      if (!this._entered) {
        this.y += this.speed * 1.5;
        if (this.y >= 40) {
          this._entered = true;
          this._baseX = this.x;
        }
      } else {
        this._swayAngle += this._swaySpeed;
        this.x = this._baseX + Math.sin(this._swayAngle) * this._swayAmp;
        // 缓慢下移
        this.y += 0.3;
      }
    } else {
      this.y += this.speed;
    }

    if (this.y > canvasH) {
      this.active = false;
      return null;
    }

    // 射击
    if (this._shootCooldown > 0) {
      this._shootCooldown--;
      return null;
    }

    if (this.type === 'medium') {
      this._shootCooldown = 110 + Math.random() * 40;
      return this._createBullets('single');
    }
    if (this.type === 'boss') {
      this._shootCooldown = 50 + Math.random() * 20;
      return this._createBullets('spread');
    }
    return null;
  }

  _createBullets(pattern) {
    const cx = this.x + this.width / 2;
    const by = this.y + this.height;
    if (pattern === 'spread') {
      return [
        { x: cx - 3, y: by, vx: -1.5, vy: 4, active: true },
        { x: cx - 3, y: by, vx:  0,   vy: 5, active: true },
        { x: cx - 3, y: by, vx:  1.5, vy: 4, active: true },
      ];
    }
    // single
    return [{ x: cx - 3, y: by, vx: 0, vy: 4.5, active: true }];
  }

  takeDamage(dmg = 1) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.active = false;
      this.game.emit('enemyDestroyed', this);
    }
  }

  render(ctx) {
    const cx = Math.round(this.x + this.width / 2);
    const cy = Math.round(this.y + this.height / 2);
    const hw = this.width / 2;
    const hh = this.height / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI); // 倒置（朝下）

    if (this.type === 'small') this._renderSmall(ctx, hw, hh);
    else if (this.type === 'medium') this._renderMedium(ctx, hw, hh);
    else this._renderBoss(ctx, hw, hh);

    ctx.restore();

    // 血条（medium + boss）
    if (this.type !== 'small') this._renderHP(ctx);
  }

  _renderSmall(ctx, hw, hh) {
    // 尾焰
    this._drawFlame(ctx, hw, hh, '#ff6600', '#ffcc00', 8);

    ctx.fillStyle = '#ff3333';
    ctx.beginPath();
    ctx.moveTo(0, -hh);
    ctx.lineTo(hw * 0.5, hh * 0.3);
    ctx.lineTo(hw * 0.25, hh);
    ctx.lineTo(-hw * 0.25, hh);
    ctx.lineTo(-hw * 0.5, hh * 0.3);
    ctx.closePath();
    ctx.fill();

    // 机翼
    ctx.fillStyle = '#cc2222';
    ctx.beginPath();
    ctx.moveTo(-hw * 0.5, hh * 0.1);
    ctx.lineTo(-hw, hh * 0.5);
    ctx.lineTo(-hw * 0.5, hh * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(hw * 0.5, hh * 0.1);
    ctx.lineTo(hw, hh * 0.5);
    ctx.lineTo(hw * 0.5, hh * 0.6);
    ctx.closePath();
    ctx.fill();
  }

  _renderMedium(ctx, hw, hh) {
    this._drawFlame(ctx, hw, hh, '#ff8800', '#ffdd00', 12);

    ctx.fillStyle = '#ff7700';
    ctx.beginPath();
    ctx.moveTo(0, -hh);
    ctx.lineTo(hw * 0.6, 0);
    ctx.lineTo(hw * 0.4, hh);
    ctx.lineTo(-hw * 0.4, hh);
    ctx.lineTo(-hw * 0.6, 0);
    ctx.closePath();
    ctx.fill();

    // 宽翼
    ctx.fillStyle = '#cc5500';
    ctx.beginPath();
    ctx.moveTo(-hw * 0.6, 0);
    ctx.lineTo(-hw, hh * 0.6);
    ctx.lineTo(-hw * 0.5, hh * 0.7);
    ctx.lineTo(-hw * 0.4, hh * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(hw * 0.6, 0);
    ctx.lineTo(hw, hh * 0.6);
    ctx.lineTo(hw * 0.5, hh * 0.7);
    ctx.lineTo(hw * 0.4, hh * 0.1);
    ctx.closePath();
    ctx.fill();

    // 机舱
    ctx.fillStyle = '#220000';
    ctx.beginPath();
    ctx.ellipse(0, -hh * 0.2, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  _renderBoss(ctx, hw, hh) {
    this._drawFlame(ctx, hw, hh, '#cc00ff', '#ff88ff', 18);

    // 主体
    ctx.fillStyle = '#aa00dd';
    ctx.beginPath();
    ctx.moveTo(0, -hh);
    ctx.lineTo(hw * 0.7, -hh * 0.2);
    ctx.lineTo(hw * 0.5, hh * 0.5);
    ctx.lineTo(0, hh);
    ctx.lineTo(-hw * 0.5, hh * 0.5);
    ctx.lineTo(-hw * 0.7, -hh * 0.2);
    ctx.closePath();
    ctx.fill();

    // 大翼
    ctx.fillStyle = '#880099';
    ctx.beginPath();
    ctx.moveTo(-hw * 0.7, -hh * 0.2);
    ctx.lineTo(-hw, hh * 0.4);
    ctx.lineTo(-hw * 0.6, hh * 0.6);
    ctx.lineTo(-hw * 0.5, hh * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(hw * 0.7, -hh * 0.2);
    ctx.lineTo(hw, hh * 0.4);
    ctx.lineTo(hw * 0.6, hh * 0.6);
    ctx.lineTo(hw * 0.5, hh * 0.5);
    ctx.closePath();
    ctx.fill();

    // 机舱（发光眼）
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.ellipse(-8, -hh * 0.3, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8, -hh * 0.3, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  _drawFlame(ctx, hw, hh, colorOuter, colorInner, fh) {
    const flicker = Math.sin(this._flameFrame * 0.5) * 3;
    const h = fh + flicker;
    const grad = ctx.createLinearGradient(0, hh - 4, 0, hh + h);
    grad.addColorStop(0, colorInner);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-hw * 0.25, hh - 4);
    ctx.quadraticCurveTo(0, hh + h, hw * 0.25, hh - 4);
    ctx.closePath();
    ctx.fill();
  }

  _renderHP(ctx) {
    const barW = this.width;
    const barH = 4;
    const bx = this.x;
    const by = this.y - 8;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(bx, by, barW, barH);
    const ratio = this.hp / this.maxHp;
    const barColor = ratio > 0.5 ? '#44ff44' : ratio > 0.25 ? '#ffaa00' : '#ff3333';
    ctx.fillStyle = barColor;
    ctx.fillRect(bx, by, barW * ratio, barH);
  }
}
