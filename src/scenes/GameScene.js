import { Scene } from '../core/Scene.js';
import { Player } from '../objects/Player.js';
import { Enemy } from '../objects/Enemy.js';
import { PowerUp } from '../objects/PowerUp.js';
import { Background } from '../objects/Background.js';
import { Bullet } from '../objects/Bullet.js';
import { EnemyBullet } from '../objects/EnemyBullet.js';
import { Explosion } from '../objects/Explosion.js';
import { CollisionManager } from '../managers/CollisionManager.js';
import { PoolManager } from '../managers/PoolManager.js';
import { MathUtils } from '../utils/MathUtils.js';

export class GameScene extends Scene {
  constructor(game) {
    super(game);

    this._bulletPool = new PoolManager(
      () => new Bullet(),
      (b) => { b.x = 0; b.y = 0; b.width = 6; b.height = 14; }
    );

    this._onEnemyDestroyed = this._handleEnemyDestroyed.bind(this);
    this._onPlayerDead     = this._handlePlayerDead.bind(this);
    this._onPlayerHit      = this._handlePlayerHit.bind(this);
  }

  enter() {
    super.enter();

    this.background   = new Background(this.game);
    this.player       = new Player(this.game);
    this.bullets      = [];
    this.enemies      = [];
    this.enemyBullets = [];
    this.powerUps     = [];
    this.explosions   = [];
    this._floatTexts  = []; // 浮动分数文字

    this._spawnTimer    = 0;
    this._spawnInterval = this.game.config.spawn.initialInterval;

    // 屏幕震动
    this._shakeTimer = 0;
    this._shakeAmp   = 0;

    // 暂停
    this._paused = false;
    this._pauseBtn = { x: 0, y: 0, w: 36, h: 36 }; // 在 render 中赋值

    this.game.score.reset();
    this.game.on('enemyDestroyed', this._onEnemyDestroyed);
    this.game.on('playerDead',     this._onPlayerDead);
    this.game.on('playerHit',      this._onPlayerHit);
  }

  leave() {
    super.leave();
    this.game.off('enemyDestroyed', this._onEnemyDestroyed);
    this.game.off('playerDead',     this._onPlayerDead);
    this.game.off('playerHit',      this._onPlayerHit);
  }

  // ── 更新 ──────────────────────────────────────────────

  update() {
    if (this._paused) return;

    this.background.update();
    this._updatePlayer();
    this._updateBullets();
    this._updateEnemies();
    this._updateEnemyBullets();
    this._updatePowerUps();
    this._updateExplosions();
    this._updateFloatTexts();
    this._checkCollisions();
    this._spawnEnemies();
    this._adjustDifficulty();

    if (this._shakeTimer > 0) this._shakeTimer--;
  }

  _updatePlayer() {
    if (!this.player.active) return;
    const newBullets = this.player.update();
    for (const b of newBullets) {
      const bullet = this._bulletPool.get();
      bullet.init(b.x, b.y, b.speed, b.width, b.height);
      this.bullets.push(bullet);
    }
  }

  _updateBullets() {
    for (const b of this.bullets) b.update();
    this._bulletPool.releaseInactive(this.bullets);
  }

  _updateEnemies() {
    for (const e of this.enemies) {
      const shots = e.update();
      if (shots) {
        for (const s of shots) {
          this.enemyBullets.push(new EnemyBullet(s.x, s.y, s.vx, s.vy));
        }
      }
    }
    this.enemies = this.enemies.filter(e => e.active);
  }

  _updateEnemyBullets() {
    const h = this.game.config.canvas.height;
    for (const b of this.enemyBullets) b.update(h);
    this.enemyBullets = this.enemyBullets.filter(b => b.active);
  }

  _updatePowerUps() {
    for (const p of this.powerUps) p.update();
    this.powerUps = this.powerUps.filter(p => p.active);
  }

  _updateExplosions() {
    for (const e of this.explosions) e.update();
    this.explosions = this.explosions.filter(e => e.active);
  }

  _updateFloatTexts() {
    for (const t of this._floatTexts) {
      t.y -= 1.2;
      t.alpha -= 0.022;
    }
    this._floatTexts = this._floatTexts.filter(t => t.alpha > 0);
  }

  _checkCollisions() {
    // 玩家子弹 vs 敌机
    CollisionManager.checkBulletsVsEnemies(this.bullets, this.enemies, (bullet, enemy) => {
      bullet.active = false;
      enemy.takeDamage(1);
    });

    if (!this.player.active) return;

    // 敌机 vs 玩家（碰撞）
    CollisionManager.checkPlayerVsEnemies(this.player, this.enemies, (enemy) => {
      this.explosions.push(new Explosion(
        enemy.x + enemy.width / 2,
        enemy.y + enemy.height / 2,
        enemy.type
      ));
      enemy.active = false;
      this.player.takeDamage();
    });

    // 敌方子弹 vs 玩家
    for (const eb of this.enemyBullets) {
      if (!eb.active) continue;
      if (CollisionManager.rectRect(eb, this.player)) {
        eb.active = false;
        this.player.takeDamage();
      }
    }

    // 道具 vs 玩家
    for (const p of this.powerUps) {
      if (p.active && CollisionManager.rectRect(this.player, p)) {
        this._applyPowerUp(p.type);
        p.active = false;
      }
    }
  }

  _applyPowerUp(type) {
    if (type === 'shield') {
      this.player.shielded = true;
      setTimeout(() => { if (this.player) this.player.shielded = false; }, 5000);
    } else if (type === 'doubleFire') {
      this.player.doubleFire = true;
      setTimeout(() => { if (this.player) this.player.doubleFire = false; }, 8000);
    } else if (type === 'bomb') {
      for (const e of this.enemies) {
        this.explosions.push(new Explosion(
          e.x + e.width / 2,
          e.y + e.height / 2,
          e.type
        ));
        e.active = false;
        this.game.emit('enemyDestroyed', e);
      }
    }
    this._addFloatText(
      this.player.x + this.player.width / 2,
      this.player.y - 10,
      type === 'shield' ? '护盾!' : type === 'doubleFire' ? '双发!' : '炸弹!',
      '#ffdd00', 20
    );
  }

  _spawnEnemies() {
    this._spawnTimer++;
    if (this._spawnTimer < this._spawnInterval) return;
    this._spawnTimer = 0;

    const cfg = this.game.config.enemy;
    const types   = ['small', 'medium', 'boss'];
    const weights = types.map(t => cfg[t].spawnWeight);
    const type = MathUtils.weightedRandom(types, weights);
    this.enemies.push(new Enemy(this.game, type));
  }

  _adjustDifficulty() {
    const { initialInterval, minInterval, difficultyStep } = this.game.config.spawn;
    const level = Math.floor(this.game.score.score / difficultyStep);
    this._spawnInterval = Math.max(minInterval, initialInterval - level * 4);
  }

  // ── 事件处理 ──────────────────────────────────────────

  _handleEnemyDestroyed(enemy) {
    this.game.score.add(enemy.score);

    this.explosions.push(new Explosion(
      enemy.x + enemy.width / 2,
      enemy.y + enemy.height / 2,
      enemy.type
    ));

    this._addFloatText(
      enemy.x + enemy.width / 2,
      enemy.y,
      `+${enemy.score}`,
      '#ffff44', 16
    );

    // 道具掉落
    if (Math.random() < this.game.config.powerUp.dropChance) {
      const types = this.game.config.powerUp.types;
      const t = types[MathUtils.randomInt(0, types.length - 1)];
      this.powerUps.push(new PowerUp(this.game, enemy.x + enemy.width / 2 - 14, enemy.y, t));
    }
  }

  _handlePlayerDead() {
    this.explosions.push(new Explosion(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2,
      'medium'
    ));
    setTimeout(() => {
      this.game.switchScene('gameOver', { score: this.game.score.score });
    }, 800);
  }

  _handlePlayerHit() {
    this._shakeTimer = 14;
    this._shakeAmp   = 7;
  }

  _addFloatText(x, y, text, color, size = 16) {
    this._floatTexts.push({ x, y, text, color, size, alpha: 1 });
  }

  // ── 渲染 ──────────────────────────────────────────────

  render(ctx) {
    const { width, height } = this.game.config.canvas;

    // 屏幕震动偏移
    let sx = 0, sy = 0;
    if (this._shakeTimer > 0) {
      const amp = this._shakeAmp * (this._shakeTimer / 14);
      sx = (Math.random() - 0.5) * amp * 2;
      sy = (Math.random() - 0.5) * amp * 2;
    }

    ctx.save();
    ctx.translate(sx, sy);

    this.background.render(ctx);

    for (const e of this.explosions)   e.render(ctx);
    for (const b of this.bullets)      b.render(ctx);
    for (const b of this.enemyBullets) b.render(ctx);
    for (const e of this.enemies)      e.render(ctx);
    for (const p of this.powerUps)     p.render(ctx);
    if (this.player.active) this.player.render(ctx);

    this._renderFloatTexts(ctx);
    ctx.restore();

    this._renderHUD(ctx, width, height);

    if (this._paused) this._renderPauseOverlay(ctx, width, height);
  }

  _renderFloatTexts(ctx) {
    for (const t of this._floatTexts) {
      ctx.save();
      ctx.globalAlpha = t.alpha;
      ctx.fillStyle = t.color;
      ctx.font = `bold ${t.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 6;
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
    }
  }

  _renderHUD(ctx, width) {
    // 顶栏半透明背景
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, width, 42);

    // 分数
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.game.score.score}`, 12, 21);

    // 最高分
    ctx.fillStyle = '#ffcc00';
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`最高 ${this.game.score.highScore}`, width / 2, 21);

    // 生命值（心形）
    ctx.textAlign = 'right';
    ctx.font = '17px Arial';
    ctx.fillText('❤'.repeat(this.player.hp), width - 48, 21);

    // 暂停按钮
    const bx = width - 38;
    const by = 5;
    const bw = 30;
    const bh = 32;
    this._pauseBtn = { x: bx, y: by, w: bw, h: bh };

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 6);
    ctx.fill();

    if (this._paused) {
      // 播放图标
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(bx + 10, by + 8);
      ctx.lineTo(bx + 10, by + 24);
      ctx.lineTo(bx + 24, by + 16);
      ctx.closePath();
      ctx.fill();
    } else {
      // 暂停图标（两竖线）
      ctx.fillStyle = '#fff';
      ctx.fillRect(bx + 9,  by + 8, 4, 16);
      ctx.fillRect(bx + 17, by + 8, 4, 16);
    }
  }

  _renderPauseOverlay(ctx, width, height) {
    ctx.fillStyle = 'rgba(0,0,10,0.65)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('暂停', width / 2, height / 2);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('点击继续', width / 2, height / 2 + 40);
  }

  // ── 输入 ──────────────────────────────────────────────

  onPointerDown(x, y) {
    const btn = this._pauseBtn;
    if (x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
      this._paused = !this._paused;
      return;
    }
    if (this._paused) {
      this._paused = false;
      return;
    }
    this.player?.moveTo(x, y);
  }

  onPointerMove(x, y) {
    if (!this._paused) this.player?.moveTo(x, y);
  }
}
