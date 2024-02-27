import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./slices/signInSlice";
export const store = configureStore({
  reducer: {
    signInreducer: signInSlice,
  },
});
