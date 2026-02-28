/**
 * 滚动背景（星空视差效果）
 */
export class Background {
  constructor(game) {
    this.game = game;
    const { width, height } = game.config.canvas;
    this.width = width;
    this.height = height;

    // 三层星星：近、中、远
    this._layers = [
      this._createStars(60, 0.5, 1),   // 远层：小且慢
      this._createStars(40, 1.2, 1.5), // 中层
      this._createStars(20, 2.5, 2),   // 近层：大且快
    ];
  }

  _createStars(count, speed, maxSize) {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * maxSize + 0.5,
        speed,
        alpha: Math.random() * 0.5 + 0.5,
      });
    }
    return stars;
  }

  update() {
    for (const layer of this._layers) {
      for (const star of layer) {
        star.y += star.speed;
        if (star.y > this.height) {
          star.y = 0;
          star.x = Math.random() * this.width;
        }
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, this.width, this.height);

    for (const layer of this._layers) {
      for (const star of layer) {
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
}
