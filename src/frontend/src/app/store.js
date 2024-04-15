import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import gameReducer from "./slices/gameSlice";
import userReducer from "./slices/playerSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    player: userReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware]),
});
