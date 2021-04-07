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
    return this.y >= maxY + this.height || this.x + this.width <= 0;
  }

  collidedWithObstacle(obstacle) {
    if (obstacle.color == COLOR.DEFAULT || obstacle.color != this.color) {
      if (this.y + this.height > obstacle.y + obstacle.height * 0.1) {
        this.isGrounded = false;
        this.x -= PLATFORM_SPEED;
      } else {
        this.y = obstacle.y - obstacle.height;
        this.isGrounded = true;
        this.velocity = 0;
        this.jumpsLeft = MAX_JUMPS;
      }
      return true;
    }

    return false;
  }

  jump() {
    if (this.jumpsLeft > 0) {
      this.velocity = PLAYER_JUMP_SPEED;
      --this.jumpsLeft;
    }
  }
}
