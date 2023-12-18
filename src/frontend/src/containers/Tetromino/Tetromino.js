// Tetrominoes: https://en.wikipedia.org/wiki/Tetromino
const jTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]

const lTetromino = [
    [1, width+1, width*2+1, 0],
    [width, width+1, width+2, 2],
    [1, width+1, width*2+1, width*2+2],
    [width, width*2, width+1, width+2]
]

const sTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
]

const zTetromino = [
    [1,width,width+1,width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width+1, width+2, width*2+1, width*2+2]
]

const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
]

const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
]

const theTetrominoes = [lTetromino, jTetromino, zTetromino, sTetromino, tTetromino, oTetromino, iTetromino]

