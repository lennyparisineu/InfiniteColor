// ========= VARS =========

const BLOCK_SIZE = 60;
const REFRESH_RATE = 50;
const GRAVITY = -2;
const PLATFORM_SPEED = 15;
const BACKGROUND_SCROLL_SPEED = PLATFORM_SPEED * 0.15;
const MAX_JUMPS = 2;
const OUTLINE_ONLY = false;
const PLAYER_JUMP_SPEED = 15;
const BACKGROUND_IMAGE = "assets/background.png";
const PLATFORM_BORDER_WIDTH = 3;

// ========= ENUMS =========

const COLOR = Object.freeze({
  DEFAULT: {
    start: "#969696",
    end: "#6b6b6b",
  },
  WHITE: {
    start: "#FFFFFF",
    end: "#FFFFFF",
  },
  RED: {
    start: "#FF0000",
    end: "#FF0000",
  },
  GREEN: {
    start: "#FFFFFF",
    end: "#FFFFFF",
  },
  BLUE: {
    start: "#0000FF",
    end: "#0000FF",
  },
  BORDER: {
    start: "#FF0000",
    end: "#0000FF",
  },
});

const TYPE = Object.freeze({
  BLOCK: 0,
  KILLER: 1,
  PLAYER: 2,
  MODULE: 3,
});
