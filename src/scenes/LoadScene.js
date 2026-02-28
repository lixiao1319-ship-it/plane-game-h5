import { Scene } from '../core/Scene.js';

/**
 * 加载场景
 * 预加载图片/音频资源，完成后自动跳转主菜单
 */
export class LoadScene extends Scene {
  constructor(game) {
    super(game);
    this._progress = 0;
  }

  enter() {
    super.enter();
    this._progress = 0;
    this._loadAssets();
  }

  async _loadAssets() {
    const assets = [
      // 在此填入实际资源路径
      // { type: 'image', key: 'player', src: 'assets/images/sprites/player.png' },
      // { type: 'audio', key: 'bgm',    src: 'assets/audio/bgm/game.mp3' },
    ];

    const total = assets.length || 1;
    let loaded = 0;

    const onProgress = () => {
      loaded++;
      this._progress = loaded / total;
      this._updateLoadingUI(this._progress);
    };

    const promises = assets.map(asset => this._loadOne(asset).then(onProgress));
    await Promise.all(promises);

    // 全部加载完毕
    this._updateLoadingUI(1);
    setTimeout(() => {
      document.getElementById('loading-screen')?.remove();
      this.game.switchScene('menu');
    }, 300);
  }

  _loadOne({ type, src }) {
    return new Promise((resolve, reject) => {
      if (type === 'image') {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      } else if (type === 'audio') {
        const audio = new Audio();
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.src = src;
      } else {
        resolve();
      }
    });
  }

  _updateLoadingUI(ratio) {
    const bar = document.getElementById('loading-bar');
    const text = document.getElementById('loading-text');
    if (bar) bar.style.width = `${Math.round(ratio * 100)}%`;
    if (text) text.textContent = `加载中... ${Math.round(ratio * 100)}%`;
  }

  update() {}
  render() {}
}
