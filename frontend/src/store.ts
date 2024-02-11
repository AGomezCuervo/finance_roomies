import { configureStore } from "@reduxjs/toolkit";
import debtsReducer from "./features/debtsSlice";
import authReducer from "./features/authSlice";

const store = configureStore({
  reducer: {
    debts: debtsReducer,
    auth: authReducer
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

