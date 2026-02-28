/**
 * 爆炸粒子效果
 * 创建后调用 update()，active=false 时即可回收
 */
export class Explosion {
  /**
   * @param {number} x      爆炸中心 x
   * @param {number} y      爆炸中心 y
   * @param {'small'|'medium'|'boss'} type  决定粒子数量和颜色
   */
  constructor(x, y, type = 'small') {
    this.x = x;
    this.y = y;
    this.active = true;

    const count   = type === 'boss' ? 40 : type === 'medium' ? 22 : 14;
    const maxSpeed = type === 'boss' ? 6  : type === 'medium' ? 4.5 : 3;
    const maxSize  = type === 'boss' ? 7  : type === 'medium' ? 5 : 3.5;
    const life     = type === 'boss' ? 55 : type === 'medium' ? 45 : 35;

    const palette =
      type === 'boss'   ? ['#ff00ff','#cc00ff','#ff88ff','#ffffff','#ffaaff'] :
      type === 'medium' ? ['#ff8800','#ffcc00','#ff4400','#ffffff','#ffee88'] :
                          ['#ff4444','#ff8844','#ffcc44','#ffffff'];

    this._particles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * maxSpeed + 0.5;
      this._particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * maxSize + 1,
        alpha: 1,
        life: Math.random() * life + 15,
        maxLife: 0,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
      this._particles[this._particles.length - 1].maxLife = this._particles[this._particles.length - 1].life;
    }

    // 中心闪光
    this._flash = { alpha: 1, size: type === 'boss' ? 40 : type === 'medium' ? 24 : 16 };
  }

  update() {
    if (this._flash.alpha > 0) this._flash.alpha -= 0.12;

    let alive = 0;
    for (const p of this._particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // 重力
      p.vx *= 0.96;
      p.life--;
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.life > 0) alive++;
    }

    if (alive === 0 && this._flash.alpha <= 0) this.active = false;
  }

  render(ctx) {
    // 中心闪光
    if (this._flash.alpha > 0) {
      ctx.save();
      ctx.globalAlpha = this._flash.alpha * 0.6;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this._flash.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    for (const p of this._particles) {
      if (p.alpha <= 0) continue;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
