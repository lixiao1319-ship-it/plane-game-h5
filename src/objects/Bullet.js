/**
 * 玩家子弹 — 发光激光效果（配合 PoolManager 使用）
 */
export class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 6;
    this.height = 14;
    this.speed = 10;
    this.active = false;
  }

  init(x, y, speed, w, h) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width  = w ?? 6;
    this.height = h ?? 14;
    this.active = true;
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.height < 0) this.active = false;
  }

  render(ctx) {
    const cx = this.x + this.width / 2;

    // 外光晕
    ctx.save();
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 8;

    const grad = ctx.createLinearGradient(cx, this.y, cx, this.y + this.height);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#80ffff');
    grad.addColorStop(1, '#00aaff');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, this.width / 2);
    ctx.fill();
    ctx.restore();
  }
}
