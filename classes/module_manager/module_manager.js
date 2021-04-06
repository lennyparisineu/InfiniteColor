class ModuleManager {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.initPool();
  }

  initPool() {
    this.pool = [];

    const floor = new Module(
      [
        new Block(0, canvas.clientHeight / 2 + BLOCK_SIZE),
        new Block(BLOCK_SIZE * 1, canvas.clientHeight / 2 + BLOCK_SIZE),
        new Block(BLOCK_SIZE * 2, canvas.clientHeight / 2 + BLOCK_SIZE),
        new Block(BLOCK_SIZE * 3, canvas.clientHeight / 2 + BLOCK_SIZE),
      ],
      7
    );

    this.pool.push(floor);
    this.activeModules = [
      this.pool[0].copy(),
      this.pool[0].copy().placeAtX(BLOCK_SIZE * 5),
      this.pool[0].copy().placeAtX(BLOCK_SIZE * 10),
      this.pool[0].copy().placeAtX(BLOCK_SIZE * 15),
    ];
  }

  update(ctx, player) {
    this.updateActiveModules(ctx);
    this.checkForPlayerCollisions(player);
  }

  updateActiveModules(ctx) {
    let module;
    for (let i = 0; i < this.activeModules.length; ++i) {
      module = this.activeModules[i];
      module.update(ctx);
      if (module.isCompletelyOutOfView()) {
        this.activeModules.splice(i, 1);
        this.createModuleInstance();
      }
    }
  }

  checkForPlayerCollisions(player) {
    let collided = false;
    let collision;

    player.y -= player.velocity;
    for (let i = 0; i < this.activeModules.length; ++i) {
      collision = this.activeModules[i].collidedWith(player);
      if (collision != null) {
        collided = player.collidedWithObstacle(collision);
      }
    }

    player.y += player.velocity;

    if (!collided) {
      player.isGrounded = false;
    }

    player.update(ctx);
  }

  createModuleInstance() {
    let index = Math.round(Math.random() * (this.pool.length - 1));
    let module = this.pool[index].copy();
    module.placeAtX(this.canvasWidth);
    this.activeModules.push(module);
  }
}
