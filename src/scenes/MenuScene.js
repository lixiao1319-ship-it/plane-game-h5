import { Scene } from '../core/Scene.js';

/**
 * 主菜单场景
 */
export class MenuScene extends Scene {
  constructor(game) {
    super(game);
    this._btnRect = null;
  }

  enter() {
    super.enter();
  }

  render(ctx) {
    const { width, height } = this.game.config.canvas;

    // 背景
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, width, height);

    // 标题
    ctx.fillStyle = '#00cfff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('飞机大战', width / 2, height * 0.3);

    // 最高分
    ctx.fillStyle = '#aaa';
    ctx.font = '18px Arial';
    ctx.fillText(`最高分: ${this.game.score.highScore}`, width / 2, height * 0.45);

    // 开始按钮
    const bw = 160, bh = 50;
    const bx = width / 2 - bw / 2;
    const by = height * 0.6 - bh / 2;
    this._btnRect = { x: bx, y: by, w: bw, h: bh };

    ctx.fillStyle = '#00cfff';
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 10);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('开始游戏', width / 2, height * 0.6);
  }

  onPointerDown(x, y) {
    const btn = this._btnRect;
    if (btn && x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
      this.game.switchScene('game');
    }
  }
}
