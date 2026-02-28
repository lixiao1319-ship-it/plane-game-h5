import { Scene } from '../core/Scene.js';
import { Background } from '../objects/Background.js';

/**
 * 游戏结束场景
 */
export class GameOverScene extends Scene {
  constructor(game) {
    super(game);
    this._score   = 0;
    this._btnRect = null;
    this._frame   = 0;
    this._bg      = null;
  }

  enter({ score = 0 } = {}) {
    super.enter();
    this._score = score;
    this._frame = 0;
    this._bg = new Background(this.game);
  }

  update() {
    this._bg.update();
    this._frame++;
  }

  render(ctx) {
    const { width, height } = this.game.config.canvas;
    this._bg.render(ctx);

    // 遮罩
    ctx.fillStyle = 'rgba(0,0,10,0.72)';
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 标题
    ctx.save();
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 42px Arial';
    ctx.fillText('GAME OVER', width / 2, height * 0.24);
    ctx.shadowBlur = 0;
    ctx.restore();

    // 面板
    const pw = 260, ph = 150;
    const px = width / 2 - pw / 2;
    const py = height * 0.38;
    ctx.fillStyle = 'rgba(0,20,50,0.75)';
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,180,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ccddff';
    ctx.font = '16px Arial';
    ctx.fillText('本次得分', width / 2, py + 32);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px Arial';
    ctx.fillText(this._score, width / 2, py + 74);

    const isNew = this._score > 0 && this._score >= this.game.score.highScore;
    if (isNew) {
      const pulse = Math.abs(Math.sin(this._frame * 0.08));
      ctx.fillStyle = `rgba(255,220,0,${0.6 + pulse * 0.4})`;
      ctx.font = 'bold 15px Arial';
      ctx.fillText('★ 新纪录！', width / 2, py + 112);
    } else {
      ctx.fillStyle = '#ffcc00';
      ctx.font = '14px Arial';
      ctx.fillText(`最高分  ${this.game.score.highScore}`, width / 2, py + 112);
    }

    // 再来一局按钮
    const bw = 170, bh = 52;
    const bx = width / 2 - bw / 2;
    const by = height * 0.75 - bh / 2;
    this._btnRect = { x: bx, y: by, w: bw, h: bh };

    const pulse = Math.sin(this._frame * 0.07) * 0.3 + 0.7;
    ctx.save();
    ctx.shadowColor = '#00cfff';
    ctx.shadowBlur = 16 * pulse;
    ctx.fillStyle = 'rgba(0,40,80,0.85)';
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 12);
    ctx.fill();
    ctx.strokeStyle = `rgba(0,212,255,${pulse})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 22px Arial';
    ctx.fillText('再来一局', width / 2, height * 0.75);

    // 返回菜单提示
    ctx.fillStyle = 'rgba(150,180,200,0.6)';
    ctx.font = '13px Arial';
    ctx.fillText('其他区域点击返回菜单', width / 2, height * 0.88);
  }

  onPointerDown(x, y) {
    const btn = this._btnRect;
    if (btn && x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
      this.game.switchScene('game');
    } else {
      this.game.switchScene('menu');
    }
  }
}
