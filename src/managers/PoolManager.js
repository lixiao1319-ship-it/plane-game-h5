/**
 * 对象池管理器
 * 减少频繁创建/销毁对象（子弹、爆炸特效等）的 GC 压力
 */
export class PoolManager {
  /**
   * @param {Function} factory   创建新对象的工厂函数 () => Object
   * @param {Function} reset     重置对象状态的函数 (obj) => void
   * @param {number}   initSize  预分配数量
   */
  constructor(factory, reset, initSize = 20) {
    this._factory = factory;
    this._reset = reset;
    this._pool = [];

    for (let i = 0; i < initSize; i++) {
      this._pool.push(factory());
    }
  }

  /** 从池中取出一个对象并激活 */
  get() {
    const obj = this._pool.length > 0 ? this._pool.pop() : this._factory();
    obj.active = true;
    return obj;
  }

  /** 回收对象到池中 */
  release(obj) {
    obj.active = false;
    this._reset(obj);
    this._pool.push(obj);
  }

  /** 批量回收数组中 active=false 的对象 */
  releaseInactive(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (!list[i].active) {
        this.release(list[i]);
        list.splice(i, 1);
      }
    }
  }
}
