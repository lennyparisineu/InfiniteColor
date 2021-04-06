class Sprite {
  constructor(x, y, w, h) {
    if (this.constructor === Sprite) {
      throw new Error("Can't instantiate abstract class 'Sprite'");
    }

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  collidedWith(otherSprite) {
    throw new Error("Abstract method must be implemented");
  }

  update(ctx, otherSprites) {
    throw new Error("Abstract method must be implemented");
  }

  isInView(offset) {
    return offset + this.x + this.width > 0;
  }
}
