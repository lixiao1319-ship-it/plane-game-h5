/**
 * 音频管理器
 * 统一管理背景音乐与音效的播放/停止/音量
 */
export class AudioManager {
  constructor(game) {
    this.game = game;
    this._bgm = null;
    this._sfxCache = {};
    this._muted = false;
    const cfg = game.config.audio;
    this._bgmVolume = cfg.bgmVolume;
    this._sfxVolume = cfg.sfxVolume;
  }

  /** 播放背景音乐（循环） */
  playBGM(src) {
    this.stopBGM();
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = this._muted ? 0 : this._bgmVolume;
    audio.play().catch(() => {});
    this._bgm = audio;
  }

  stopBGM() {
    if (this._bgm) {
      this._bgm.pause();
      this._bgm = null;
    }
  }

  /** 播放音效（同一音效可叠加） */
  playSFX(src) {
    if (this._muted) return;
    let audio = this._sfxCache[src];
    if (!audio) {
      audio = new Audio(src);
      this._sfxCache[src] = audio;
    }
    const clone = audio.cloneNode();
    clone.volume = this._sfxVolume;
    clone.play().catch(() => {});
  }

  setMute(muted) {
    this._muted = muted;
    if (this._bgm) this._bgm.volume = muted ? 0 : this._bgmVolume;
  }

  toggleMute() {
    this.setMute(!this._muted);
    return this._muted;
  }

  setBGMVolume(v) {
    this._bgmVolume = Math.max(0, Math.min(1, v));
    if (this._bgm && !this._muted) this._bgm.volume = this._bgmVolume;
  }

  setSFXVolume(v) {
    this._sfxVolume = Math.max(0, Math.min(1, v));
  }
}
