/**
 * Represents the player's block.
 */
class Player extends Sprite {
  /**
   * Constructs a Player at the given position with a starting default color and size of
   * constant BLOCK_SIZE.
   *
   * @param {number} x starting x position
   * @param {number} y starting y position
   */
  constructor(x, y) {
    super(x, y, BLOCK_SIZE, BLOCK_SIZE, TYPE.PLAYER);
    this.velocity = 0;
    this.acceleration = GRAVITY;
    this.jumpsLeft = MAX_JUMPS;
    this.isGrounded = false;
    this.isDead = false;
  }

  /**
   * Gets called every frame. This method:
   * 1. Applies gravity if the player isn't grounded.
   * 2. Checks to make sure the player is in bounds, and if he/she isnt, this.isDead is set to true.
   * 3. Renders the player.
   *
   * @override
   * @param {CanvasContext} ctx the canvas' context (used to draw)
   */
  update(ctx) {
    if (!this.isGrounded) {
      this.fall();
    }

    if (!this.isInView(0)) {
      this.isDead = true;
    }

    this.render(ctx, 0);
  }

  /**
   * Determines if this sprite is fully inside the canvas.
   *
   * @param {number} xOffset how much to offset this sprite's x position by
   * @returns {boolean} whether or not the sprite is fully within view
   */
  isInView(xOffset) {
    let rightXPos = xOffset + this.x + this.width;

    return (
      rightXPos > 0 &&
      rightXPos < SCREEN_WIDTH &&
      this.y + this.height > 0 &&
      this.y < SCREEN_HEIGHT
    );
  }

  /**
   * Makes the player fall by applying velocity to the y position, and incrementing velocity by acceleration.
   */
  fall() {
    this.y -= this.velocity;
    this.velocity += this.acceleration;
  }

  /**
   * Is this player's color different from the obstacle's?
   *
   * @param {Sprite} obstacle the obstacle to compare colors with
   * @returns {boolean} whether or not the colors are different
   */
  colorsAreDifferent(obstacle) {
    return (
      obstacle.color.start !== COLOR.DEFAULT.start &&
      obstacle.color.start === this.color.start
    );
  }

  /**
   * Makes the player jump.
   */
  jump() {
    if (this.jumpsLeft > 0) {
      this.velocity = PLAYER_JUMP_SPEED;
      --this.jumpsLeft;
    }
  }
}
