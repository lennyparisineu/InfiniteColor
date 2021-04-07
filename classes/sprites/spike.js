/**
 * Represents a killer Spike.
 */
class Spike extends Sprite {
  /**
   * Constructs a Spike at the given position with the given color and size of
   * constant BLOCK_SIZE.
   *
   * @param {number} x starting x position
   * @param {number} y starting y position
   * @param {COLOR | undefined} color starting color
   */
  constructor(x, y, color) {
    super(x, y, BLOCK_SIZE, BLOCK_SIZE, TYPE.KILLER);
    this.color = color ? color : COLOR.DEFAULT;
  }

  /**
   * Renders this sprite onto the canvas.
   *
   * @param {CanvasContext} ctx the canvas' context
   * @param {number} xOffset how much to offset this block's x position by
   */
  render(ctx, xOffset) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + xOffset, this.y + this.height);
    ctx.lineTo(this.x + xOffset + this.width / 2, this.y);
    ctx.lineTo(this.x + xOffset + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fill();
  }

  // TODO -- fix this for better collision detection. Right now it's the same logic
  // as the square's collision detection function

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
