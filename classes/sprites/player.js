/**
 * Represents the player's block.
 */
class Player extends Block {
  /**
   * Constructs a Player at the given position with a starting default color and size of
   * constant BLOCK_SIZE.
   *
   * @param {number} x starting x position
   * @param {number} y starting y position
   * @param {number} maxY the max y value the player can be at before going out of bounds
   */
  constructor(x, y, maxY) {
    super(x, y, COLOR.DEFAULT, TYPE.PLAYER);
    this.velocity = 0;
    this.acceleration = GRAVITY;
    this.jumpsLeft = MAX_JUMPS;
    this.isGrounded = false;
    this.isDead = false;
    this.maxY = maxY;
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
      console.log("player.js 38")
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
   * Gets called when this player collides with an obstacle.This method applies additional logic to determine
   * if it shoudl count as a collision, and what to do if it does.
   *
   * @param {Sprite} obstacle the obstacle this player collided with
   * @param xOffset TODO define xOffset
   * @returns {boolean} whether or not the obstacle should count as a collision
   */
  onCollision(obstacle, xOffset) {
    // if the player's color does not match the obstacle, then it should likely count as a collision
    if (!this.colorsAreDifferent(obstacle)) {
      // if the obstacle is a killer, then kill the player
      if (obstacle.type === TYPE.KILLER) {
        if (Math.abs(this.y - obstacle.y) < BLOCK_SIZE) {
          this.isDead = true;
        }
        // otherwise if the obstacle is a platform
      }
      else if (obstacle.type === TYPE.BLOCK && !obstacle.is_wall) {
        if (Math.abs(this.y - obstacle.y) < BLOCK_SIZE) {
          // TODO -- improve this
          // if the top of the player is hitting the obstacle
          if (this.y > obstacle.y + obstacle.height)  //- obstacle.height * 0.5)
          {
            // the player is not teleported
            this.isGrounded = false;
            this.x = obstacle.x + xOffset - this.width;
            // if the bottom of the player is touching/inside of the obstacle
          } else if (this.y <= obstacle.y + obstacle.height) // * 0.2) //else if (this.y + this.height <= obstacle.y + obstacle.height * 0.5)
          {
            // fix the player's bottom to be the top of the obstacle
            this.y = obstacle.y + obstacle.height;
            // make the player grounded
            this.isGrounded = true;
            // reset velocity to 0
            this.velocity = 0;
            // and reset jumpsLeft
            this.jumpsLeft = MAX_JUMPS;
          }
          return true;
        }
      }
    }

    return false;
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
