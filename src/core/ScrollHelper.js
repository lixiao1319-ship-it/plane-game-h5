// Reusable inertial scroll helper for vertical lists.

class ScrollHelper {
  constructor() {
    this.scrollY = 0;
    this.velocity = 0;
    this.dragging = false;
    this.dragStartY = 0;
    this.scrollStartY = 0;
    this.lastMoveTime = 0;
    this.lastMoveY = 0;
    this.maxScroll = 0;
  }

  setMaxScroll(max) {
    this.maxScroll = Math.max(0, max);
    this.scrollY = Math.max(0, Math.min(this.maxScroll, this.scrollY));
  }

  onTouchStart(y) {
    this.dragging = false;
    this.velocity = 0;
    this.dragStartY = y;
    this.scrollStartY = this.scrollY;
    this.lastMoveTime = Date.now();
    this.lastMoveY = y;
  }

  onTouchMove(y) {
    const dy = this.dragStartY - y;

    if (Math.abs(dy) > 6) this.dragging = true;

    // Track velocity based on movement delta (works even with single move call)
    const moveDelta = this.lastMoveY - y;
    if (Math.abs(moveDelta) > 1) {
      this.velocity = this.velocity * 0.5 + moveDelta * 20; // scale for px/s
    }
    this.lastMoveY = y;

    this.scrollY = Math.max(0, Math.min(this.maxScroll, this.scrollStartY + dy));
  }

  onTouchEnd() {
    this.dragging = false;
  }

  update(dt) {
    if (this.dragging) return;
    if (Math.abs(this.velocity) < 1) {
      this.velocity = 0;
      return;
    }

    // Inertial scroll with friction
    this.scrollY += this.velocity * dt;
    this.velocity *= Math.pow(0.92, dt * 60); // friction

    // Bounce back at edges
    if (this.scrollY < 0) {
      this.scrollY = 0;
      this.velocity = 0;
    } else if (this.scrollY > this.maxScroll) {
      this.scrollY = this.maxScroll;
      this.velocity = 0;
    }

    // Stop when slow enough
    if (Math.abs(this.velocity) < 1) this.velocity = 0;
  }

  clamp() {
    this.scrollY = Math.max(0, Math.min(this.maxScroll, this.scrollY));
  }
}

module.exports = ScrollHelper;
