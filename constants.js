// ========= VARS =========

const BLOCK_SIZE = 60;
const REFRESH_RATE = 50;
const GRAVITY = -2;
const PLATFORM_SPEED = 15;
const MAX_JUMPS = 2;
const OUTLINE_ONLY = false;
const PLAYER_JUMP_SPEED = 15;

// ========= ENUMS =========

const COLOR = Object.freeze({
  DEFAULT: "#FFFFFF",
  WHITE: "#FFFFFF",
  RED: "#FF0000",
  GREEN: "#00FF00",
  BLUE: "#0000FF",
});

const TYPE = Object.freeze({
  BLOCK: 0,
  KILLER: 1,
  PLAYER: 2,
  MODULE: 3,
});
