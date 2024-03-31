import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./slices/signInSlice";
import agentSlice from "./slices/AgentSlice";
export const store = configureStore({
  reducer: {
    signInreducer: signInSlice,
    agentreducer: agentSlice,
  },
});
