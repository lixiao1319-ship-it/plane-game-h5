import { Scene } from '../core/Scene.js';
import { Player } from '../objects/Player.js';
import { Enemy } from '../objects/Enemy.js';
import { PowerUp } from '../objects/PowerUp.js';
import { Background } from '../objects/Background.js';
import { Bullet } from '../objects/Bullet.js';
import { CollisionManager } from '../managers/CollisionManager.js';
import { PoolManager } from '../managers/PoolManager.js';
import { MathUtils } from '../utils/MathUtils.js';

/**
 * 核心游戏场景
 */
export class GameScene extends Scene {
  constructor(game) {
    super(game);

    // 子弹对象池
    this._bulletPool = new PoolManager(
      () => new Bullet(),
      (b) => { b.x = 0; b.y = 0; }
    );

    this._onEnemyDestroyed = this._handleEnemyDestroyed.bind(this);
    this._onPlayerDead = this._handlePlayerDead.bind(this);
  }

  enter() {
    super.enter();

    this.background = new Background(this.game);
    this.player = new Player(this.game);
    this.bullets = [];
    this.enemies = [];
    this.powerUps = [];

    this._spawnTimer = 0;
    this._spawnInterval = this.game.config.spawn.initialInterval;

    this.game.score.reset();

    this.game.on('enemyDestroyed', this._onEnemyDestroyed);
    this.game.on('playerDead', this._onPlayerDead);
  }

  leave() {
    super.leave();
    this.game.off('enemyDestroyed', this._onEnemyDestroyed);
    this.game.off('playerDead', this._onPlayerDead);
  }

  // ── 更新 ──────────────────────────────────────────────

  update(dt) {
    this.background.update();
    this._updatePlayer();
    this._updateBullets();
    this._updateEnemies();
    this._updatePowerUps();
    this._checkCollisions();
    this._spawnEnemies();
    this._adjustDifficulty();
  }

  _updatePlayer() {
    if (!this.player.active) return;
    const newBullets = this.player.update();
    for (const b of newBullets) {
      const bullet = this._bulletPool.get();
      bullet.init(b.x, b.y, b.speed);
      this.bullets.push(bullet);
    }
  }

  _updateBullets() {
    for (const b of this.bullets) b.update();
    this._bulletPool.releaseInactive(this.bullets);
  }

  _updateEnemies() {
    for (const e of this.enemies) e.update();
    this.enemies = this.enemies.filter(e => e.active);
  }

  _updatePowerUps() {
    for (const p of this.powerUps) p.update();
    this.powerUps = this.powerUps.filter(p => p.active);
  }

  _checkCollisions() {
    // 子弹打敌机
    CollisionManager.checkBulletsVsEnemies(this.bullets, this.enemies, (bullet, enemy) => {
      bullet.active = false;
      enemy.takeDamage(1);
    });

    // 玩家碰敌机
    if (this.player.active) {
      CollisionManager.checkPlayerVsEnemies(this.player, this.enemies, (enemy) => {
        enemy.active = false;
        this.player.takeDamage();
      });

      // 玩家拾取道具
      for (const p of this.powerUps) {
        if (p.active && CollisionManager.rectRect(this.player, p)) {
          this._applyPowerUp(p.type);
          p.active = false;
        }
      }
    }
  }

  _applyPowerUp(type) {
    if (type === 'shield') {
      this.player.shielded = true;
      setTimeout(() => { this.player.shielded = false; }, 5000);
    } else if (type === 'doubleFire') {
      this.player.doubleFire = true;
      setTimeout(() => { this.player.doubleFire = false; }, 8000);
    } else if (type === 'bomb') {
      this.enemies.forEach(e => e.takeDamage(99));
    }
  }

  _spawnEnemies() {
    this._spawnTimer++;
    if (this._spawnTimer < this._spawnInterval) return;
    this._spawnTimer = 0;

    const cfg = this.game.config.enemy;
    const types = ['small', 'medium', 'boss'];
    const weights = types.map(t => cfg[t].spawnWeight);
    const type = MathUtils.weightedRandom(types, weights);
    this.enemies.push(new Enemy(this.game, type));
  }

  _adjustDifficulty() {
    const { initialInterval, minInterval, difficultyStep } = this.game.config.spawn;
    const level = Math.floor(this.game.score.score / difficultyStep);
    this._spawnInterval = Math.max(minInterval, initialInterval - level * 5);
  }

  // ── 事件处理 ──────────────────────────────────────────

  _handleEnemyDestroyed(enemy) {
    this.game.score.add(enemy.score);

    // 道具掉落
    if (Math.random() < this.game.config.powerUp.dropChance) {
      const types = this.game.config.powerUp.types;
      const type = types[MathUtils.randomInt(0, types.length - 1)];
      this.powerUps.push(new PowerUp(this.game, enemy.x, enemy.y, type));
    }
  }

  _handlePlayerDead() {
    this.game.switchScene('gameOver', { score: this.game.score.score });
  }

  // ── 渲染 ──────────────────────────────────────────────

  render(ctx) {
    this.background.render(ctx);

    for (const b of this.bullets) b.render(ctx);
    for (const e of this.enemies) e.render(ctx);
    for (const p of this.powerUps) p.render(ctx);
    if (this.player.active) this.player.render(ctx);

    this._renderHUD(ctx);
  }

  _renderHUD(ctx) {
    const { width } = this.game.config.canvas;

    // 分数
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`分数: ${this.game.score.score}`, 12, 12);

    // 生命值
    ctx.textAlign = 'right';
    ctx.fillText(`HP: ${'❤️'.repeat(this.player.hp)}`, width - 12, 12);
  }

  // ── 输入 ──────────────────────────────────────────────

  onPointerMove(x, y) {
    this.player?.moveTo(x, y);
  }
}
