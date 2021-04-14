// ========= VARS =========

const BLOCK_SIZE = 60;
const REFRESH_RATE = 40;
const GRAVITY = -3;
const PLATFORM_SPEED = 15;
const BACKGROUND_SCROLL_SPEED = PLATFORM_SPEED * 0.15;
const MAX_JUMPS = 2;
const OUTLINE_ONLY = false;
const PLAYER_JUMP_SPEED = 26;
const BACKGROUND_IMAGE = "assets/background.png";
const PLATFORM_BORDER_WIDTH = 4;

// ========= ENUMS =========

const COLOR = Object.freeze({
  DEFAULT: {
    start: "#969696",
    end: "#6b6b6b",
    border: {
      0: "#e1e1e1",
      1: "#ffffff",
    },
  },
  RED: {
    start: "#ff6985",
    end: "#ff090c",
    border: {
      0: "#ffffff",
      0.5: "#dfdfdf",
      1: "#ffffff",
    },
  },
  GREEN: {
    start: "#69ff86",
    end: "#09ff30",
    border: {
      0: "#ffffff",
      0.5: "#dfdfdf",
      1: "#ffffff",
    },
  },
  BLUE: {
    start: "#69d6ff",
    end: "#09a7ff",
    border: {
      0: "#ffffff",
      0.5: "#dfdfdf",
      1: "#ffffff",
    },
  },
});

const TYPE = Object.freeze({
  FLOOR: 0,
  WALL: 1,
  SPIKE: 2,
  PLAYER: 3,
  MODULE: 4,
});
