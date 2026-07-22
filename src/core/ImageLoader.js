// Lazily loads hero portraits by convention: assets/portraits/<heroId>.<ext>.
// Art is swappable with zero code changes — just add/replace a file named
// after the hero's id (its Chinese name) under assets/portraits/. Missing
// art fails gracefully so HeroChip can fall back to the placeholder render.

const BASE_PATH = 'assets/portraits/';
const EXTENSIONS = ['png', 'jpg', 'jpeg'];

const cache = {}; // heroId -> { status: 'pending' | 'loaded' | 'failed', image }

function canLoadImages() {
  return typeof wx !== 'undefined' && typeof wx.createImage === 'function';
}

function tryNextExtension(heroId, extIndex, entry) {
  if (extIndex >= EXTENSIONS.length) {
    entry.status = 'failed';
    console.warn(`[ImageLoader] 未找到「${heroId}」头像，已尝试: ${EXTENSIONS.map((e) => `${BASE_PATH}${heroId}.${e}`).join(', ')}`);
    return;
  }
  const img = wx.createImage();
  const path = `${BASE_PATH}${heroId}.${EXTENSIONS[extIndex]}`;
  img.onload = () => {
    entry.status = 'loaded';
    entry.image = img;
    console.log(`[ImageLoader] 加载成功: ${path}`);
  };
  img.onerror = (err) => {
    console.warn(`[ImageLoader] 加载失败: ${path}`, err && err.errMsg ? err.errMsg : err);
    tryNextExtension(heroId, extIndex + 1, entry);
  };
  img.src = path;
}

// Returns the cache entry immediately ({status, image}); triggers async load
// on first call for a given heroId. Callers should just check status each render.
function requestPortrait(heroId) {
  if (cache[heroId]) return cache[heroId];
  if (!canLoadImages()) {
    console.warn('[ImageLoader] wx.createImage 不可用，当前环境无法加载图片');
    const entry = { status: 'failed', image: null };
    cache[heroId] = entry;
    return entry;
  }
  const entry = { status: 'pending', image: null };
  cache[heroId] = entry;
  tryNextExtension(heroId, 0, entry);
  return entry;
}

module.exports = { requestPortrait };
