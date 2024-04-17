import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // all players of the room except current
  players: [],
  tetrominos: [],
  isSolo: false,
  isStarted: false,
  isGameover: false,
  isWaiting: false,
};

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    deletePlayer: (state, action) => {
      const ind = state.players.findIndex((p) => p.username === action.payload);

      if (ind !== -1) state.players.splice(ind, 1);
    },
    setRoomPlayers: (state, action) => {
      state.players = [...action.payload];
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
    setIsGameover: (state, action) => {
      state.isGameover = action.payload;
    },
    setIsSolo: (state, action) => {
      state.isSolo = action.payload;
    },
    updatePlayersSpectrum: (state, action) => {
      const ind = state.players.findIndex(
        (p) => p.username === action.payload.username
      );

      if (ind !== -1) state.players[ind].spectrum = action.payload.spectrum;
    },
    updatePlayersScore: (state, action) => {
      const ind = state.players.findIndex(
        (p) => p.username === action.payload.username
      );

      if (ind !== -1) state.players[ind].score = action.payload.score;
    },
    updatePlayersGameover: (state, action) => {
      const ind = state.players.findIndex((p) => p.username === action.payload);

      if (ind !== -1) state.players[ind].gameover = true;
    },
    clearRoom: () => initialState,
    restartGame: (state, action) => {
      state.isGameover = false;
      state.players = [...action.payload];
    },
    setTetrominos: (state, action) => {
      state.tetrominos = action.payload;
    },
    setIsWaiting: (state, action) => {
      state.isWaiting = action.payload;
    },
  },
});

export default gameSlice.reducer;

export const {
  addPlayer,
  deletePlayer,
  setIsStarted,
  setIsGameover,
  setIsSolo,
  setRoomPlayers,
  updatePlayersScore,
  updatePlayersSpectrum,
  updatePlayersGameover,
  clearRoom,
  restartGame,
  setTetrominos,
  setIsWaiting
} = gameSlice.actions;
