import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  score: 0,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = [...action.payload];
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    }
  },
});

export default userSlice.reducer;

export const { setUser, setUsername, setScore } = userSlice.actions;
