import { getGlobalProperties } from "../../api/GlobalProperties";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  isLoading: false,
  data: [],
  isError: "",
};

export const getGlobalPropertiesSlice = createSlice({
  name: "getGlobalPropertiesReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGlobalProperties.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGlobalProperties.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getGlobalProperties.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      notification.error(action.payload + "something went wrong");
    });
  },
}).reducer;
