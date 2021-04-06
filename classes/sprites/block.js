class Block extends Sprite {
  constructor(x, y, color) {
    super(x, y, BLOCK_SIZE, BLOCK_SIZE);
    this.color = color ? color : COLOR.DEFAULT;
  }

  render(ctx, xOffset) {
    if (OUTLINE_ONLY) {
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(this.x + xOffset, this.y, this.width, this.height);
      ctx.stroke();
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x + xOffset + this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    }
  }

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
