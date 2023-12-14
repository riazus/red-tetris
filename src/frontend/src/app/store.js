import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { rtkQueryErrorMiddleware } from "./middlewares/rtkQueryErrorMiddleware";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userState: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, rtkQueryErrorMiddleware]),
});
