import { getProperties } from "../../api/Property";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

let initialState = {
  isLoading: false,
  success: "",
  error: "",
  isError: false,
  data: null,
};

export const getPropertiesSlice = createSlice({
  name: "getPropertiesReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProperties.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getProperties.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = null;
    });
    builder.addCase(getProperties.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
}).reducer;
export const getPropertySlice = createSlice({
  name: "getPropertyReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProperties.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getProperties.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = null;
    });
    builder.addCase(getProperties.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const resetPropertySlice = createSlice({
  name: "resetAgentSlice",
  initialState,
  reducers: {
    reset: () => {
      console.log("here");
      return initialState;
    },
  },
}).reducer;
