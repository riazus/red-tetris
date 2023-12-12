import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { rtkQueryErrorMiddleware } from "./middlewares/rtkQueryErrorMiddleware";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, rtkQueryErrorMiddleware]),
});
