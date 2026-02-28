import GameConfig from '../config/gameConfig.js';
import { EventEmitter } from './EventEmitter.js';
import { AudioManager } from '../managers/AudioManager.js';
import { ScoreManager } from '../managers/ScoreManager.js';

/**
 * 游戏主控类（单例）
 * 负责：主循环、场景切换、输入分发
 */
export class Game extends EventEmitter {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = GameConfig;

    // 适配画布分辨率
    this._resizeCanvas();

    // 管理器
    this.audio = new AudioManager(this);
    this.score = new ScoreManager(this);

    // 场景注册表
    this._scenes = {};
    this._currentScene = null;

    // 主循环
    this._lastTime = 0;
    this._running = false;
    this._rafId = null;

    // 输入
    this._bindInput();
  }

  // ── 初始化 ───────────────────────────────────────────

  _resizeCanvas() {
    const { width, height } = this.config.canvas;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  // ── 场景管理 ─────────────────────────────────────────

  registerScene(name, scene) {
    this._scenes[name] = scene;
  }

  switchScene(name, params = {}) {
    if (this._currentScene) {
      this._currentScene.leave();
    }
    const next = this._scenes[name];
    if (!next) throw new Error(`Scene "${name}" not found`);
    this._currentScene = next;
    this._currentScene.enter(params);
    this.emit('sceneChange', name);
  }

  // ── 主循环 ────────────────────────────────────────────

  start() {
    this._running = true;
    this._lastTime = performance.now();
    this._loop(this._lastTime);
  }

  stop() {
    this._running = false;
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  _loop(timestamp) {
    if (!this._running) return;
    const dt = Math.min((timestamp - this._lastTime) / 1000, 0.05); // 上限 50ms 防卡顿
    this._lastTime = timestamp;

    this._update(dt);
    this._render();

    this._rafId = requestAnimationFrame(t => this._loop(t));
  }

  _update(dt) {
    if (this._currentScene) this._currentScene.update(dt);
  }

  _render() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this._currentScene) this._currentScene.render(ctx);
  }

  // ── 输入绑定 ──────────────────────────────────────────

  _bindInput() {
    const toLocal = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY];
    };

    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      const t = e.touches[0];
      const [x, y] = toLocal(t.clientX, t.clientY);
      this._currentScene?.onPointerMove(x, y);
    }, { passive: false });

    this.canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      const t = e.touches[0];
      const [x, y] = toLocal(t.clientX, t.clientY);
      this._currentScene?.onPointerDown(x, y);
      this._currentScene?.onPointerMove(x, y);
    }, { passive: false });

    this.canvas.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      const [x, y] = toLocal(t.clientX, t.clientY);
      this._currentScene?.onPointerUp(x, y);
    });

    // 桌面调试
    this.canvas.addEventListener('mousemove', e => {
      const [x, y] = toLocal(e.clientX, e.clientY);
      this._currentScene?.onPointerMove(x, y);
    });
    this.canvas.addEventListener('mousedown', e => {
      const [x, y] = toLocal(e.clientX, e.clientY);
      this._currentScene?.onPointerDown(x, y);
    });
    this.canvas.addEventListener('mouseup', e => {
      const [x, y] = toLocal(e.clientX, e.clientY);
      this._currentScene?.onPointerUp(x, y);
    });
  }
}
