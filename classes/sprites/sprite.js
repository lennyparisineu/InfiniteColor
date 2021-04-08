/**
 * Represents a game object with given positions and dimensions.
 */
class Sprite {
  /**
   * Initializes this sprite's fields.
   *
   * @param {number} x x position
   * @param {number} y y position
   * @param {number} width width
   * @param {number} height height
   * @param {TYPE} type the type of sprite this is
   */
  constructor(x, y, width, height, type) {
    if (this.constructor === Sprite) {
      throw new Error("Can't instantiate abstract class 'Sprite'");
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  /**
   * Did this sprite collide with the other sprite?
   *
   * @param {Sprite} otherSprite a sprite to check collisions for
   * @returns {Sprite} if it did collide with the other sprite, return the object that the other sprite collided with
   */
  collidedWith(otherSprite) {
    throw new Error("Abstract method must be implemented");
  }

  /**
   * Gets called every frame.
   *
   * @param {CanvasContext} ctx the canvas' context (used to draw)
   */
  update(ctx) {
    throw new Error("Abstract method must be implemented");
  }

  /**
   * Assigns a random color to this block.
   */
  setRandomColor() {
    let rand = Math.floor(Math.random() * (Object.keys(COLOR).length - 1));
    this.color = Object.values(COLOR)[rand + 1];
    return this;
  }
}
