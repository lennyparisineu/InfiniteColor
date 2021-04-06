class Player extends Block {
  constructor(x, y) {
    super(x, y, COLOR.RED);
    this.velocity = 0;
    this.acceleration = GRAVITY;
    this.isGrounded = false;
    this.jumpsLeft = MAX_JUMPS;
  }

  update(ctx) {
    this.render(ctx, 0);
    if (!this.isGrounded) {
      this.fall();
    }
  }

  fall() {
    this.y -= this.velocity;
    this.velocity += this.acceleration;
  }

  isOutOfBounds(maxY) {
    return this.y >= maxY + this.height;
  }

  collidedWithObstacle(obstacle) {
    if (obstacle.color == COLOR.DEFAULT || obstacle.color != this.color) {
      this.velocity = 0;
      this.jumpsLeft = MAX_JUMPS;
      this.isGrounded = true;
      this.y = obstacle.y - obstacle.height;
      return true;
    }

    return false;
  }
}
