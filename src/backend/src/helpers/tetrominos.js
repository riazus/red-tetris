const TETROMINOS = ["I", "J", "L", "O", "S", "T", "Z"];

export const random20Tetrominos = () => {
  const res = [];

  for (var i = 0; i < 20; i++) {
    res.push(TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)]);
  }

  return res;
};
