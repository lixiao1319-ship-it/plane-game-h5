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
    return;
  }
  const img = wx.createImage();
  img.onload = () => {
    entry.status = 'loaded';
    entry.image = img;
  };
  img.onerror = () => tryNextExtension(heroId, extIndex + 1, entry);
  img.src = `${BASE_PATH}${heroId}.${EXTENSIONS[extIndex]}`;
}

// Returns the cache entry immediately ({status, image}); triggers async load
// on first call for a given heroId. Callers should just check status each render.
function requestPortrait(heroId) {
  if (cache[heroId]) return cache[heroId];
  const entry = { status: 'pending', image: null };
  cache[heroId] = entry;
  if (canLoadImages()) tryNextExtension(heroId, 0, entry);
  else entry.status = 'failed';
  return entry;
}

module.exports = { requestPortrait };
