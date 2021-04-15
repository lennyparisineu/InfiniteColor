/**
 * Represents a basic block that the player can collide with (if they do not have the same color).
 */
class Wall extends GameObject {
  /**
   * Constructs a Block at the given position with the size of
   * constant BLOCK_SIZE.
   *
   * @param {number} x starting x position
   * @param {number} y starting y position
   */
  constructor(x, y) {
    super(x, y, BLOCK_SIZE, BLOCK_SIZE * 5, TYPE.WALL);
  }

  /**
   * Gets called when this object collides with the player.
   * Allows the player to go through it, otherwise push the player to the left.
   *
   * TODO -- figure out why collision with wall isnt detected when player is on the floor
   *
   * @override
   * @param {*} player
   */
  collidedWithPlayer(player) {
    if (player.colorsAreDifferent(this)) {
      player.isDead = true;
    }
  }
}
