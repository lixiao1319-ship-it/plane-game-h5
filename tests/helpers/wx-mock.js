// Mock WeChat mini-game environment for Node.js testing.

function mockCanvasContext() {
  const gradient = { addColorStop() {} };
  const ctx = {
    canvas: { width: 750, height: 1334 },
    fillStyle: '', strokeStyle: '', lineWidth: 1, font: '', textAlign: '', textBaseline: '',
    globalAlpha: 1, globalCompositeOperation: 'source-over',
    save() {}, restore() {}, beginPath() {}, closePath() {},
    moveTo() {}, lineTo() {}, arcTo() {}, arc() {}, rect() {}, clip() {},
    quadraticCurveTo() {}, bezierCurveTo() {},
    fill() {}, stroke() {}, fillRect() {}, strokeRect() {}, clearRect() {},
    fillText() {}, measureText: (t) => ({ width: String(t).length * 14 }),
    drawImage() {}, translate() {}, scale() {}, rotate() {},
    createLinearGradient: () => gradient,
    createRadialGradient: () => gradient,
    createPattern: () => null,
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    putImageData() {}, setTransform() {}, drawFocusIfNeeded() {},
  };
  return ctx;
}

function mockCanvas() {
  return {
    width: 750, height: 1334,
    getContext: () => mockCanvasContext(),
    toDataURL: () => '',
  };
}

function mockImage() {
  const img = {
    width: 100, height: 100,
    src: '',
    onload: null, onerror: null,
  };
  // Auto-resolve on next tick when src is set
  Object.defineProperty(img, 'src', {
    set(v) {
      this._src = v;
      setTimeout(() => {
        if (this.onload) this.onload();
      }, 0);
    },
    get() { return this._src; },
  });
  return img;
}

function install() {
  global.wx = {
    getSystemInfoSync: () => ({
      windowWidth: 375,
      windowHeight: 667,
      pixelRatio: 2,
      platform: 'devtools',
    }),
    createCanvas: mockCanvas,
    createImage: mockImage,
    onTouchStart() {}, onTouchMove() {}, onTouchEnd() {},
    onShow() {}, onHide() {},
    getStorageSync: () => '',
    setStorageSync() {},
    removeStorageSync() {},
    vibrateShort() {},
    showToast() {},
    navigateTo() {},
    request() {},
  };
  global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
  global.cancelAnimationFrame = clearTimeout;
  global.GameGlobal = global;
}

function uninstall() {
  delete global.wx;
  delete global.requestAnimationFrame;
  delete global.cancelAnimationFrame;
  delete global.GameGlobal;
}

module.exports = { install, uninstall, mockCanvasContext, mockCanvas, mockImage };
