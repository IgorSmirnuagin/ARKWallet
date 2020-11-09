import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer, { RootStateType } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<RootStateType>()],
});

export type AppDispatch = typeof store.dispatch;

export default store;
