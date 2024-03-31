import { getAgents } from "../../api/Agents";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
let initialState = {
  isLoading: false,
  data: [],
  isError: false,
};

const getAgentsSlice = createSlice({
  name: "getAgentsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAgents.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getAgents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(getAgents.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
});

export default getAgentsSlice.reducer;
