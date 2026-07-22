// Lazily loads hero portraits by convention: assets/portraits/<assetId>.<ext>.
//
// IMPORTANT: keyed by hero.assetId (an ASCII slug like "h001"), never by the
// Chinese hero.id/name. WeChat DevTools' local dev server percent-encodes
// non-ASCII characters when Image.src is assigned but does NOT decode them
// back when resolving the file on disk, so a path built from a Chinese hero
// name reliably 404s in local dev even though the real file exists
// (see docs/hero-asset-ids.md for the assetId -> hero name lookup table).
//
// Art is still swappable with zero code changes — just add/replace a file
// named after the hero's assetId under assets/portraits/. Missing art fails
// gracefully so HeroChip falls back to the placeholder render.

const BASE_PATH = 'assets/portraits/';
const EXTENSIONS = ['png', 'jpg', 'jpeg'];

const cache = {}; // assetId -> { status: 'pending' | 'loaded' | 'failed', image }

function canLoadImages() {
  return typeof wx !== 'undefined' && typeof wx.createImage === 'function';
}

function tryNextExtension(assetId, extIndex, entry) {
  if (extIndex >= EXTENSIONS.length) {
    entry.status = 'failed';
    return;
  }
  const img = wx.createImage();
  const path = `${BASE_PATH}${assetId}.${EXTENSIONS[extIndex]}`;
  img.onload = () => {
    entry.status = 'loaded';
    entry.image = img;
  };
  img.onerror = () => tryNextExtension(assetId, extIndex + 1, entry);
  img.src = path;
}

// Returns the cache entry immediately ({status, image}); triggers async load
// on first call for a given assetId. Callers should just check status each render.
function requestPortrait(assetId) {
  if (cache[assetId]) return cache[assetId];
  if (!canLoadImages()) {
    const entry = { status: 'failed', image: null };
    cache[assetId] = entry;
    return entry;
  }
  const entry = { status: 'pending', image: null };
  cache[assetId] = entry;
  tryNextExtension(assetId, 0, entry);
  return entry;
}

module.exports = { requestPortrait };
