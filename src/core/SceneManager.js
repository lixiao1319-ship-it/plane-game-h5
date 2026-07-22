// Minimal stack-based scene manager. A scene is a plain object with optional
// onEnter/onExit/update(dt)/render(ctx)/onTouchStart(x,y)/onTouchEnd(x,y) hooks.

class SceneManager {
  constructor() {
    this.stack = [];
  }

  push(scene, params) {
    const top = this.top();
    if (top && top.onPause) top.onPause();
    this.stack.push(scene);
    if (scene.onEnter) scene.onEnter(params);
  }

  replace(scene, params) {
    const top = this.stack.pop();
    if (top && top.onExit) top.onExit();
    this.stack.push(scene);
    if (scene.onEnter) scene.onEnter(params);
  }

  pop() {
    const top = this.stack.pop();
    if (top && top.onExit) top.onExit();
    const newTop = this.top();
    if (newTop && newTop.onResume) newTop.onResume();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  update(dt) {
    const scene = this.top();
    if (scene && scene.update) scene.update(dt);
  }

  render(ctx) {
    const scene = this.top();
    if (scene && scene.render) scene.render(ctx);
  }

  touchStart(x, y) {
    const scene = this.top();
    if (scene && scene.onTouchStart) scene.onTouchStart(x, y);
  }

  touchMove(x, y) {
    const scene = this.top();
    if (scene && scene.onTouchMove) scene.onTouchMove(x, y);
  }

  touchEnd(x, y) {
    const scene = this.top();
    if (scene && scene.onTouchEnd) scene.onTouchEnd(x, y);
  }
}

module.exports = SceneManager;
