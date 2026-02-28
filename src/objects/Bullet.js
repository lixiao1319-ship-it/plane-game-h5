/**
 * 子弹对象（配合 PoolManager 使用）
 */
export class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 8;
    this.height = 16;
    this.speed = 10;
    this.active = false;
  }

  init(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.active = true;
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.height < 0) {
      this.active = false;
    }
  }

  render(ctx) {
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
