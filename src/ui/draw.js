function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fillRoundRect(ctx, x, y, w, h, r, color) {
  ctx.fillStyle = color;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
}

function strokeRoundRect(ctx, x, y, w, h, r, color, lineWidth) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth || 1;
  roundRect(ctx, x, y, w, h, r);
  ctx.stroke();
}

// Wraps text to fit maxWidth, drawing each line with lineHeight spacing.
// Returns the number of lines drawn.
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = String(text).split('');
  let line = '';
  let lines = 0;
  for (let i = 0; i < chars.length; i++) {
    const test = line + chars[i];
    if (ctx.measureText(test).width > maxWidth && line.length > 0) {
      ctx.fillText(line, x, y + lines * lineHeight);
      line = chars[i];
      lines++;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y + lines * lineHeight);
  return lines + 1;
}

function progressBar(ctx, x, y, w, h, ratio, bgColor, fgColor) {
  fillRoundRect(ctx, x, y, w, h, h / 2, bgColor);
  const r = Math.max(0, Math.min(1, ratio));
  if (r > 0) fillRoundRect(ctx, x, y, w * r, h, h / 2, fgColor);
}

module.exports = { roundRect, fillRoundRect, strokeRoundRect, wrapText, progressBar };
