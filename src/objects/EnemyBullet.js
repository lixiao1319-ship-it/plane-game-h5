/**
 * 敌机子弹 — 向下运动，红色发光效果
 */
export class EnemyBullet {
  constructor(x, y, vx = 0, vy = 4.5) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = 7;
    this.height = 13;
    this.active = true;
  }

  update(canvasH) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > canvasH) this.active = false;
  }

  render(ctx) {
    const cx = this.x + this.width / 2;
    ctx.save();
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur = 8;
    const grad = ctx.createLinearGradient(cx, this.y, cx, this.y + this.height);
    grad.addColorStop(0, '#ff0000');
    grad.addColorStop(0.4, '#ff8844');
    grad.addColorStop(1, '#ffcc00');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, this.width / 2);
    ctx.fill();
    ctx.restore();
  }
}
