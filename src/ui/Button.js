const { fillRoundRect, strokeRoundRect } = require('./draw');

class Button {
  constructor({ x, y, w, h, text, onTap, bg, textColor, fontSize, disabled }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.onTap = onTap;
    this.bg = bg || '#3a6ff0';
    this.textColor = textColor || '#ffffff';
    this.fontSize = fontSize || 28;
    this.disabled = !!disabled;
  }

  hitTest(x, y) {
    return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
  }

  handleTap(x, y) {
    if (this.disabled) return false;
    if (this.hitTest(x, y)) {
      if (this.onTap) this.onTap();
      return true;
    }
    return false;
  }

  render(ctx) {
    const bg = this.disabled ? '#8a8a8a' : this.bg;
    fillRoundRect(ctx, this.x, this.y, this.w, this.h, 12, bg);
    strokeRoundRect(ctx, this.x, this.y, this.w, this.h, 12, 'rgba(255,255,255,0.25)', 2);
    ctx.fillStyle = this.textColor;
    ctx.font = `bold ${this.fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2 + 1);
  }
}

module.exports = Button;
