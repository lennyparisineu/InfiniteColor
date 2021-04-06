class Module extends Sprite {
  constructor(sprites, totalWidth) {
    super();
    this.sprites = sprites;
    this.totalWidth = totalWidth;
    this.x = 0;
  }

  placeAtX(x) {
    this.x = x;
    return this;
  }

  collidedWith(otherSprite) {
    let collision;
    for (let i = 0; i < this.sprites.length; ++i) {
      collision = this.sprites[i].collidedWith(otherSprite, this.x);
      if (collision != null) {
        return collision;
      }
    }
    return null;
  }

  update(ctx) {
    this.x -= PLATFORM_SPEED;
    for (let i = 0; i < this.sprites.length; ++i) {
      this.sprites[i].render(ctx, this.x);
    }
  }

  isCompletelyOutOfView() {
    for (let i = 0; i < this.sprites.length; ++i) {
      if (this.sprites[i].isInView(this.x)) {
        return false;
      }
    }
    return true;
  }

  isPartiallyOutOfView() {
    for (let i = 0; i < this.sprites.length; ++i) {
      if (!this.sprites[i].isInView()) {
        return true;
      }
    }

    return false;
  }

  copy() {
    let sprites = this.sprites.map((sprite) => {
      return Object.assign(
        Object.create(
          // Set the prototype of the new object to the prototype of the instance.
          // Used to allow new object behave like class instance.
          Object.getPrototypeOf(sprite)
        ),
        // Prevent shallow copies of nested structures like arrays, etc
        JSON.parse(JSON.stringify(sprite))
      );
    });
    return new Module(sprites, this.totalWidth);
  }
}
