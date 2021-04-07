/**
 * Represents a collection of sprites grouped together as one 'Module'.
 * As the module moves, all of its sprites are moved with it.
 *
 */
class Module {
  /**
   * Constructs a module with the given sprites.
   *
   * @param {Sprite[]} sprites a list of sprites that this module holds
   */
  constructor(sprites) {
    this.x = 0;
    this.sprites = sprites;
    this.alreadyTriggeredModuleSpawn = false;
  }

  /**
   * Places this module at the given x coordinate
   *
   * @param {number} x the x coordinate to place this module at
   * @returns {Module} this
   */
  placeAtX(x) {
    this.x = x;
    return this;
  }

  /**
   * Did any of this module's sprites collide with the other sprite?
   *
   * @param {Sprite} otherSprite a sprite to check collisions for
   * @returns {Sprite} if it did collide with the other sprite, return the object that the other sprite collided with
   */
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

  /**
   * Gets called every frame. This method:
   * 1. Moves the module back by constant PLATFORM_SPEED
   * 2. Renders all of its sprites (offset by this module's x position)
   *
   * @param {CanvasContext} ctx the canvas' context (used to draw)
   */
  update(ctx) {
    this.x -= PLATFORM_SPEED;
    for (let i = 0; i < this.sprites.length; ++i) {
      this.sprites[i].render(ctx, this.x);
    }
  }

  /**
   * Are all of this module's sprites completely out of view?
   * @returns {boolean} whether or not this module's sprites are completely out of view
   */
  isCompletelyOutOfView() {
    let sprite;
    for (let i = 0; i < this.sprites.length; ++i) {
      sprite = this.sprites[i];
      if (sprite.x + sprite.width > 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Are all of this module's sprites completely in view?
   * @returns {boolean} whether or not this module's sprites are completely in view
   */
  isCompletelyInView() {
    let sprite;
    for (let i = 0; i < this.sprites.length; ++i) {
      sprite = this.sprites[i];
      if (this.x + sprite.x + sprite.width > SCREEN_WIDTH) {
        return false;
      }
    }
    return true;
  }

  /**
   * Creates a deep copy of this module.
   *
   * @returns {Module} the copy of this module
   */
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
    return new Module(sprites);
  }
}
