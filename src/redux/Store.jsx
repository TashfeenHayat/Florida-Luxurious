import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./slices/signInSlice";
import {
  getAgentsSlice,
  addAgentSlice,
  getAgentSlice,
  updateAgentSlice,
  deleteAgentSlice,
  resetAgentSlice,
} from "./slices/AgentSlice";
export const store = configureStore({
  reducer: {
    signInreducer: signInSlice,
    getAgentsReducer: getAgentsSlice,
    addAgentReducer: addAgentSlice,
    getAgentReducer: getAgentSlice,
    updateAgentReducer: updateAgentSlice,
    deleteAgentReducer: deleteAgentSlice,
    resetAgentReducer: resetAgentSlice
  },
});
