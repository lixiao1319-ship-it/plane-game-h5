// Thin wrapper over wx.setStorageSync/getStorageSync with an in-memory fallback,
// so systems code can run (and be unit-tested) outside the WeChat runtime too.

const memory = {};
const hasWx = typeof wx !== 'undefined' && wx.setStorageSync;

function get(key, defaultValue) {
  try {
    const value = hasWx ? wx.getStorageSync(key) : memory[key];
    if (value === '' || value === undefined || value === null) return defaultValue;
    return value;
  } catch (e) {
    return defaultValue;
  }
}

function set(key, value) {
  try {
    if (hasWx) wx.setStorageSync(key, value);
    else memory[key] = value;
  } catch (e) {
    // storage full or unavailable — silently ignore, in-session state still works
  }
}

module.exports = { get, set };
