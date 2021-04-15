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
    this.color = COLOR.DEFAULT;
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

  /**
   * Renders this sprite onto the canvas.
   *
   * @param {CanvasContext} ctx the canvas' context (for drawing)
   * @param {number} xOffset how much to offset this block's x position by
   */
  render(ctx, xOffset) {
    let grd = ctx.createLinearGradient(
      this.x + xOffset,
      this.y,
      this.x + xOffset,
      this.y + this.height
    );
    grd.addColorStop(0, this.color.start);
    grd.addColorStop(1, this.color.end);

    ctx.fillStyle = grd;
    ctx.fillRect(this.x + xOffset, this.y, this.width, this.height);
    grd = ctx.createLinearGradient(
      this.x + xOffset,
      this.y,
      this.x + xOffset,
      this.y + this.height
    );

    let gradients = Object.keys(this.color.border);
    gradients.forEach((x) => grd.addColorStop(x, this.color.border[x]));
    ctx.strokeStyle = grd;
    ctx.lineWidth = PLATFORM_BORDER_WIDTH;
    ctx.strokeRect(this.x + xOffset, this.y, this.width, this.height);
  }
}
