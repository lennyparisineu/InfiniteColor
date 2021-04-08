/**
 * Represents a basic block that the player can collide with (if they do not have the same color).
 */
class Block extends Sprite {
  /**
   * Constructs a Block at the given position with the size of
   * constant BLOCK_SIZE.
   *
   * @param {number} x starting x position
   * @param {number} y starting y position
   */
  constructor(x, y) {
    super(x, y, BLOCK_SIZE, BLOCK_SIZE, TYPE.BLOCK);
    this.color = COLOR.DEFAULT;
  }

  /**
   * Sets the color of this block
   *
   * @param {COLOR} color sets this block's color
   * @returns this
   */
  setColor(color) {
    this.color = color;
    return this;
  }

  /**
   * Sets the dimensions of this block
   *
   * @param {number} width the new width
   * @param {number} height the new height
   * @returns this
   */
  setDimensions(width, height) {
    this.width = width;
    this.height = height;
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

  /**
   * Did this sprite collide with the other sprite?
   *
   * @override
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
