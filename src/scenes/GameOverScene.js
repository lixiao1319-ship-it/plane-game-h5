import { Scene } from '../core/Scene.js';

/**
 * 游戏结束场景
 */
export class GameOverScene extends Scene {
  constructor(game) {
    super(game);
    this._score = 0;
    this._btnRect = null;
  }

  enter({ score = 0 } = {}) {
    super.enter();
    this._score = score;
  }

  render(ctx) {
    const { width, height } = this.game.config.canvas;

    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 40px Arial';
    ctx.fillText('游戏结束', width / 2, height * 0.28);

    ctx.fillStyle = '#fff';
    ctx.font = '22px Arial';
    ctx.fillText(`本次得分: ${this._score}`, width / 2, height * 0.42);

    ctx.fillStyle = '#ffcc00';
    ctx.fillText(`最高分: ${this.game.score.highScore}`, width / 2, height * 0.52);

    // 重新开始按钮
    const bw = 160, bh = 50;
    const bx = width / 2 - bw / 2;
    const by = height * 0.65 - bh / 2;
    this._btnRect = { x: bx, y: by, w: bw, h: bh };

    ctx.fillStyle = '#00cfff';
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 10);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('再来一局', width / 2, height * 0.65);
  }

  onPointerDown(x, y) {
    const btn = this._btnRect;
    if (btn && x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
      this.game.switchScene('game');
    }
  }
}
