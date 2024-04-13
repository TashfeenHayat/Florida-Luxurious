import {
  getAgents,
  addAgent,
  getAgent,
  updateAgent,
  deleteAgent,
} from "../../api/Agents";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
let initialState = {
  isLoading: false,
  data: [],
  allMember: [],
  isError: false,
};

export const getAgentsSlice = createSlice({
  name: "getAgentsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAgents.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAgents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.data = action.payload;
    });

    builder.addCase(getAgents.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload.message;
      notification.error({
        message: "Something went wrong",
        description: payload.message,
        duration: 2,
      });
    });
  },
}).reducer;

export const addAgentSlice = createSlice({
  name: "addAgentReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addAgent.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(addAgent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(addAgent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;

export const getAgentSlice = createSlice({
  name: "getAgentReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAgent.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getAgent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(getAgent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;

export const updateAgentSlice = createSlice({
  name: "updateAgentReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateAgent.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(updateAgent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(updateAgent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;

export const deleteAgentSlice = createSlice({
  name: "deleteAgentReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteAgent.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(deleteAgent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(deleteAgent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;
