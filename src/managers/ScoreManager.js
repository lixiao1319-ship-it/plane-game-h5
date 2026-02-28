import { StorageUtils } from '../utils/StorageUtils.js';

/**
 * 分数管理器
 * 管理当前分数、最高分及分数变化事件
 */
export class ScoreManager {
  constructor(game) {
    this.game = game;
    this._score = 0;
    this._highScore = StorageUtils.get(game.config.storage.highScore, 0);
  }

  get score() { return this._score; }
  get highScore() { return this._highScore; }

  reset() {
    this._score = 0;
    this.game.emit('scoreChange', this._score);
  }

  add(points) {
    this._score += points;
    if (this._score > this._highScore) {
      this._highScore = this._score;
      StorageUtils.set(this.game.config.storage.highScore, this._highScore);
    }
    this.game.emit('scoreChange', this._score);
  }

  saveHighScore() {
    StorageUtils.set(this.game.config.storage.highScore, this._highScore);
  }
}
