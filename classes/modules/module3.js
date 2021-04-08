const MODULE_3 = new Module([
  new Block(BLOCK_SIZE * 1, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 2, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 3, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 4, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 4, canvas.clientHeight / 2)
    .setColor(COLOR.BLUE)
    .setDimensions(BLOCK_SIZE, BLOCK_SIZE * 2),
  new Block(BLOCK_SIZE * 5, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 6, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 7, canvas.clientHeight / 2)
    .setColor(COLOR.RED)
    .setDimensions(BLOCK_SIZE, BLOCK_SIZE * 2),
  new Block(BLOCK_SIZE * 8, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 9, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 10, canvas.clientHeight / 2)
    .setColor(COLOR.GREEN)
    .setDimensions(BLOCK_SIZE, BLOCK_SIZE * 2),
  new Block(BLOCK_SIZE * 11, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 12, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 13, canvas.clientHeight / 2)
    .setColor(COLOR.RED)
    .setDimensions(BLOCK_SIZE, BLOCK_SIZE * 2),
  new Block(BLOCK_SIZE * 14, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 15, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 16, canvas.clientHeight / 2)
    .setColor(COLOR.GREEN)
    .setDimensions(BLOCK_SIZE, BLOCK_SIZE * 2),
  new Block(BLOCK_SIZE * 17, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 18, canvas.clientHeight / 2 + BLOCK_SIZE),
  new Block(BLOCK_SIZE * 19, canvas.clientHeight / 2 + BLOCK_SIZE),
]);
