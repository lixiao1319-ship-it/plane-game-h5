/**
 * 数学工具函数
 */
export const MathUtils = {
  clamp: (val, min, max) => Math.max(min, Math.min(max, val)),

  lerp: (a, b, t) => a + (b - a) * t,

  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  randomFloat: (min, max) => Math.random() * (max - min) + min,

  distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),

  /** 按权重随机选择，weights 与 items 等长 */
  weightedRandom(items, weights) {
    const total = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  },
};
