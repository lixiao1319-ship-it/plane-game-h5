const { fillRoundRect, strokeRoundRect, roundRect } = require('./draw');
const { FONT, RADIUS, COLORS } = require('./theme');

class Button {
  constructor({ x, y, w, h, text, onTap, bg, textColor, fontSize, disabled, gradient }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.onTap = onTap;
    this.bg = bg || '#3a6ff0';
    this.gradient = gradient || null;
    this.textColor = textColor || '#e8e4d8';
    this.fontSize = fontSize || 22;
    this.disabled = !!disabled;
    this._pressed = false;
    this._pressAnim = 0;
  }

  hitTest(x, y) {
    return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
  }

  handleTouchStart(x, y) {
    if (this.disabled) return false;
    if (this.hitTest(x, y)) {
      this._pressed = true;
      return true;
    }
    return false;
  }

  handleTouchEnd(x, y) {
    if (this.disabled) return false;
    const wasPressed = this._pressed;
    this._pressed = false;
    if (wasPressed && this.hitTest(x, y)) {
      if (this.onTap) this.onTap();
      return true;
    }
    return false;
  }

  handleTap(x, y) {
    if (this.disabled) return false;
    if (this.hitTest(x, y)) {
      if (this.onTap) this.onTap();
      return true;
    }
    return false;
  }

  update(dt) {
    const target = this._pressed ? 1 : 0;
    const speed = 12;
    this._pressAnim += (target - this._pressAnim) * Math.min(1, speed * dt);
  }

  render(ctx) {
    const scale = 1 - this._pressAnim * 0.03;
    const alpha = this.disabled ? 0.4 : (this._pressed ? 0.9 : 1);
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);

    // Background
    if (this.gradient && !this.disabled) {
      const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
      grad.addColorStop(0, this.gradient[0]);
      grad.addColorStop(1, this.gradient[1]);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = this.disabled ? '#444' : this.bg;
    }
    fillRoundRect(ctx, this.x, this.y, this.w, this.h, RADIUS.small, ctx.fillStyle);

    // Top highlight
    if (!this.disabled) {
      const hlGrad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.h * 0.4);
      hlGrad.addColorStop(0, 'rgba(255,255,255,0.15)');
      hlGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = hlGrad;
      fillRoundRect(ctx, this.x + 1, this.y + 1, this.w - 2, this.h * 0.35, RADIUS.small, hlGrad);
    }

    // Gold border for primary buttons, subtle for others
    if (!this.disabled) {
      ctx.strokeStyle = this.gradient ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.15)';
      ctx.lineWidth = this.gradient ? 1.5 : 1;
    } else {
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
    }
    roundRect(ctx, this.x, this.y, this.w, this.h, RADIUS.small);
    ctx.stroke();

    // Text
    ctx.fillStyle = this.textColor;
    ctx.font = `bold ${this.fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, cx, cy + 1);

    ctx.restore();
  }
}

module.exports = Button;
