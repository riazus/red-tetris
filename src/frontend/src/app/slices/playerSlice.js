import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  score: 0,
  // TODO
  spectrum: "",
  isAdmin: false,
  isGameover: false,
  isWinner: false,
  roomName: "",
};

export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    updateScore: (state, action) => {
      state.score = action.payload;
    },
    updateSpectrum: (state, action) => {
      state.spectrum = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsGameover: (state, action) => {
      state.isGameover = action.payload;
    },
    setIsWinner: (state, action) => {
      state.isWinner = action.payload;
    },
    restartPlayerGame: (state, action) => {
      const username = state.username;
      return { ...initialState, username, isAdmin: action.payload };
    },
    exitRoom: (state) => {
      const username = state.username;
      return { ...initialState, username };
    },
  },
});

export default playerSlice.reducer;

export const {
  setIsAdmin,
  setIsGameover,
  setRoomName,
  setUsername,
  setIsWinner,
  updateScore,
  updateSpectrum,
  exitRoom,
  restartPlayerGame,
} = playerSlice.actions;
