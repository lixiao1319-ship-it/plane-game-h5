/**
 * 碰撞检测管理器
 * 使用 AABB（轴对齐矩形）碰撞
 */
export class CollisionManager {
  /**
   * 矩形 vs 矩形
   * 每个对象需有 x, y, width, height 属性
   */
  static rectRect(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * 圆形 vs 圆形（适用于小物体近似）
   * 每个对象需有 x, y, radius 属性
   */
  static circleCircle(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const minDist = a.radius + b.radius;
    return dx * dx + dy * dy < minDist * minDist;
  }

  /**
   * 批量检测：bullets vs enemies
   * @param {Array} bullets
   * @param {Array} enemies
   * @param {Function} onHit  (bullet, enemy) => void
   */
  static checkBulletsVsEnemies(bullets, enemies, onHit) {
    for (const bullet of bullets) {
      if (!bullet.active) continue;
      for (const enemy of enemies) {
        if (!enemy.active) continue;
        if (CollisionManager.rectRect(bullet, enemy)) {
          onHit(bullet, enemy);
        }
      }
    }
  }

  /**
   * 批量检测：player vs enemies
   * @param {Object} player
   * @param {Array} enemies
   * @param {Function} onHit  (enemy) => void
   */
  static checkPlayerVsEnemies(player, enemies, onHit) {
    for (const enemy of enemies) {
      if (!enemy.active) continue;
      if (CollisionManager.rectRect(player, enemy)) {
        onHit(enemy);
      }
    }
  }
}
