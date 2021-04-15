/**
 * Represents a floor block that the player cannot go through unless
 * they have matching colors.
 */
class Floor extends GameObject {
  constructor(x, y) {
    super(x, y, BLOCK_SIZE, BLOCK_SIZE, TYPE.FLOOR);
  }

  /**
   * Gets called when this object collides with the player.
   * Keeps the player from clipping through the floor.
   *
   * TODO -- fix.
   */
  collidedWithPlayer(player, xOffset) {
    if (player.colorsAreDifferent(this)) {
      // if bottom of player is touching
      if (
        player.y + player.height >= this.y &&
        player.y + player.height <= this.y + this.height * 0.75
      ) {
        player.ground();
        player.y = this.y - this.height;
      }
      // if top of player is touching
      // player.y = this.y  + this.height
    }
  }
}
