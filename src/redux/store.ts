import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";

export const store = configureStore({
  reducer: {
    // user: "userInfo",
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
