/**
 * 场景基类
 * 所有游戏场景继承此类
 */
export class Scene {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this._active = false;
  }

  /** 场景进入时调用（一次性初始化） */
  enter(params = {}) {
    this._active = true;
  }

  /** 场景离开时调用（清理资源） */
  leave() {
    this._active = false;
  }

  /** 每帧逻辑更新 */
  update(dt) {}

  /** 每帧渲染 */
  render(ctx) {}

  /** 输入事件：触摸/鼠标移动 */
  onPointerMove(x, y) {}

  /** 输入事件：触摸/鼠标按下 */
  onPointerDown(x, y) {}

  /** 输入事件：触摸/鼠标抬起 */
  onPointerUp(x, y) {}
}
