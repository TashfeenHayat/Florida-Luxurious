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
import {
  getFiltersSlice,
  addFilterSlice,
  getFilterSlice,
  updateFilterSlice,
  deleteFilterSlice,
} from "./slices/FilterSlice";
import { contactUsSlice } from "./slices/ContactusSlice";

export const store = configureStore({
  reducer: {
    signInreducer: signInSlice,
    getAgentsReducer: getAgentsSlice,
    addAgentReducer: addAgentSlice,
    getAgentReducer: getAgentSlice,
    updateAgentReducer: updateAgentSlice,
    deleteAgentReducer: deleteAgentSlice,
    contactUsReducer: contactUsSlice,
    resetAgentReducer: resetAgentSlice,
    getFiltersReducer: getFiltersSlice,
    addFilterReducer: addFilterSlice,
    getFilterReducer: getFilterSlice,
    updateFilterReducer: updateFilterSlice,
    deleteFilterReducer: deleteFilterSlice,
  },
});
