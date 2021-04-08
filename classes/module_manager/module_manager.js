/**
 * Serves as the game manager. It is in charge of creating the pool of modules,
 * creating new modules in the game, and updating all sprites in the game.
 */
class ModuleManager {
  /**
   * Initialize the pool of modules and add the starting floor to the game.
   */
  constructor() {
    this.activeModules = [];
    this.initPool();
    this.createStartingFloor(3);
  }

  /**
   * Initializes the pool of modules.
   *
   * TODO -- clean this up so its not as hard-coded and messy.
   */
  initPool() {
    this.pool = [];

    // =================== cringe hard-code zone =============
    const floor = new Module(
      [
        new Block(BLOCK_SIZE * 1, canvas.clientHeight / 2 + BLOCK_SIZE),
        new Block(BLOCK_SIZE * 2, canvas.clientHeight / 2 + BLOCK_SIZE),
        new Block(BLOCK_SIZE * 3, canvas.clientHeight / 2 + BLOCK_SIZE),
        new Block(BLOCK_SIZE * 4, canvas.clientHeight / 2 + BLOCK_SIZE),
        new Block(BLOCK_SIZE * 5, canvas.clientHeight / 2 + BLOCK_SIZE),
      ],
      7
    );

    // add the modules to the pool
    this.pool.push(floor);
    this.pool = this.pool.concat(ALL_MODULES);
  }

  /**
   * Creates a few floor modules to start the game off.
   */
  createStartingFloor(floors) {
    let floor;
    for (let i = 0; i < floors; ++i) {
      floor = this.pool[0].copy().placeAtX(BLOCK_SIZE * i * 8);
      if (i < floors - 1) floor.alreadyTriggeredModuleSpawn = true;
      this.activeModules.push(floor);
    }
  }

  /**
   * Copies a module from the pool and adds it into the game slightly offscreen.
   *
   * @param {number} i the index of the module to add to the game from the pool
   * @param {number} x the x position to place the module at
   */
  copyFromPool(i, x) {
    this.activeModules.push(this.pool[i].copy().placeAtX(x));
  }

  /**
   * Gets called every frame. This method:
   * 1. Updates all modules that are active in the game.
   * 2. Checks for collisions with the player.
   *
   * @param {CanvasContext} ctx the canvas' context (used to draw)
   * @param {Player} player a reference to the player
   */
  update(ctx, player) {
    this.updateActiveModules(ctx);
    this.checkForPlayerCollisions(player);
  }

  /**
   * Calls the active modules' update function and adds/removes modules to/from the game.
   *
   * @param {CanvasContext} ctx the canvas' context (for drawing)
   */
  updateActiveModules(ctx) {
    let module;
    for (let i = 0; i < this.activeModules.length; ++i) {
      module = this.activeModules[i];
      module.update(ctx);
      if (module.isCompletelyOutOfView()) {
        this.activeModules.splice(i, 1);
        console.log("Removing module ");
        --i;
      } else if (
        i == this.activeModules.length - 1 &&
        !module.alreadyTriggeredModuleSpawn &&
        module.isCompletelyInView()
      ) {
        module.alreadyTriggeredModuleSpawn = true;
        this.createModuleInstance();
      }
    }
  }

  /**
   * Check collisions between the player and all active modules.
   *
   * TODO -- fix this for better collision detection/responsiveness.
   *
   * @param {Player} player The player
   */
  checkForPlayerCollisions(player) {
    let collided = false;
    let collision;

    // save temp ref to player's original Y
    const playerY = player.y;

    // change it to the next update's potential location
    player.y -= player.velocity;

    // check for collisions
    for (let i = 0; i < this.activeModules.length; ++i) {
      collision = this.activeModules[i].collidedWith(player);
      if (collision != null) {
        collided = player.onCollision(collision, this.activeModules[i].x);
        // if a collision was truly detected, revert back to original position to prevent/reduce clipping
        if (collided) {
          player.y = playerY;
        }
      }
    }

    // if there were no collisions
    if (!collided) {
      // make the player fall and not be grounded
      player.isGrounded = false;
      player.y += player.velocity;
    }

    // update the player
    player.update(ctx);
  }

  /**
   * Creates a new module instance from the pool and adds it into the game.
   */
  createModuleInstance() {
    let index = Math.round(Math.random() * (this.pool.length - 1));
    console.log("Adding module: " + (index - 1));
    this.copyFromPool(index, SCREEN_WIDTH + BLOCK_SIZE);
  }
}
