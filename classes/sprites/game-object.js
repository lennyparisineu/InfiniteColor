/**
 * Represents a game object with given positions and dimensions.
 */
class GameObject extends Sprite {
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
    super(x, y, width, height, type);
  }

  /**
   * Gets called when this object collides with the player.
   */
  collidedWithPlayer() {
    throw new Error("Abstract method must be implemented");
  }

  /**
   * Did this sprite collide with the other sprite?
   *
   * @param {Sprite} otherSprite a sprite to check collisions for
   * @returns {Sprite} if it did collide with the other sprite, return the object that the other sprite collided with
   */
  collidedWith(otherSprite, xOffset) {
    if (
      otherSprite.x <= this.x + xOffset + this.width &&
      otherSprite.x + otherSprite.width >= this.x + xOffset &&
      otherSprite.y <= this.y + this.height &&
      otherSprite.y + otherSprite.height >= this.y
    ) {
      return this;
    } else {
      return null;
    }
  }
}
