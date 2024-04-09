export const random20Tetrominos = () => {
  const res = [];

  for (var i = 0; i < 20; i++) {
    res.push(TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)]);
  }

  return res;
};

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));

const TETROMINOS = ["I", "J", "L", "O", "S", "T", "Z"];
const STAGE_WIDTH = 12;
const STAGE_HEIGHT = 20;
