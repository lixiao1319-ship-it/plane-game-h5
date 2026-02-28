import { Scene } from '../core/Scene.js';
import { Background } from '../objects/Background.js';

/**
 * 主菜单场景
 */
export class MenuScene extends Scene {
  constructor(game) {
    super(game);
    this._btnRect  = null;
    this._frame    = 0;
    this._bg       = null;
    // 展示用小飞机
    this._planeY   = 0;
  }

  enter() {
    super.enter();
    this._bg = new Background(this.game);
    this._frame = 0;
    this._planeY = this.game.config.canvas.height * 0.58;
  }

  update() {
    this._bg.update();
    this._frame++;
    // 飞机上下浮动
    this._planeY = this.game.config.canvas.height * 0.56 + Math.sin(this._frame * 0.04) * 8;
  }

  render(ctx) {
    const { width, height } = this.game.config.canvas;
    this._bg.render(ctx);

    // 标题光晕
    ctx.save();
    ctx.shadowColor = '#00cfff';
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 44px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('飞机大战', width / 2, height * 0.2);
    ctx.shadowBlur = 0;
    ctx.restore();

    // 副标题
    ctx.fillStyle = 'rgba(180,220,255,0.7)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PLANE BATTLE', width / 2, height * 0.275);

    // 最高分
    if (this.game.score.highScore > 0) {
      ctx.fillStyle = '#ffcc00';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(`最高分  ${this.game.score.highScore}`, width / 2, height * 0.35);
    }

    // 展示飞机
    this._drawPreviewPlane(ctx, width / 2, this._planeY);

    // 开始按钮（脉动边框）
    const bw = 170, bh = 52;
    const bx = width / 2 - bw / 2;
    const by = height * 0.78 - bh / 2;
    this._btnRect = { x: bx, y: by, w: bw, h: bh };

    const pulse = Math.sin(this._frame * 0.07) * 0.3 + 0.7;
    ctx.save();
    ctx.shadowColor = '#00cfff';
    ctx.shadowBlur = 16 * pulse;
    ctx.strokeStyle = `rgba(0,212,255,${pulse})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 12);
    ctx.stroke();
    ctx.fillStyle = `rgba(0,40,80,0.85)`;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 22px Arial';
    ctx.fillText('开 始 游 戏', width / 2, height * 0.78);

    // 操作提示
    ctx.fillStyle = 'rgba(150,180,200,0.6)';
    ctx.font = '12px Arial';
    ctx.fillText('拖动飞机移动  自动射击', width / 2, height * 0.92);
  }

  _drawPreviewPlane(ctx, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);

    // 尾焰
    const flicker = Math.sin(this._frame * 0.45) * 3;
    const fh = 14 + flicker;
    const grad = ctx.createLinearGradient(0, 24, 0, 24 + fh);
    grad.addColorStop(0, 'rgba(255,220,80,0.95)');
    grad.addColorStop(1, 'rgba(255,40,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-7, 22);
    ctx.quadraticCurveTo(0, 24 + fh, 7, 22);
    ctx.closePath();
    ctx.fill();

    // 机翼
    ctx.fillStyle = '#0099cc';
    ctx.beginPath();
    ctx.moveTo(-22, 10); ctx.lineTo(-12, -2); ctx.lineTo(-12, 18); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(22, 10);  ctx.lineTo(12, -2);  ctx.lineTo(12, 18);  ctx.closePath(); ctx.fill();

    // 机身
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(24, 8);
    ctx.lineTo(13, 28);
    ctx.lineTo(-13, 28);
    ctx.lineTo(-24, 8);
    ctx.closePath();
    ctx.fill();

    // 高光
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(8, 4);
    ctx.lineTo(0, 8);
    ctx.lineTo(-8, 4);
    ctx.closePath();
    ctx.fill();

    // 舱窗
    ctx.fillStyle = '#001a3a';
    ctx.beginPath();
    ctx.ellipse(0, -8, 6, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  onPointerDown(x, y) {
    const btn = this._btnRect;
    if (btn && x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
      this.game.switchScene('game');
    }
  }
}
