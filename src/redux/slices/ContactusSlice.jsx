import { contactUs } from "../../api/Inquiry";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

let initialState = {
  loading: false,
  success: "",
  error: "",
};

export const contactUsSlice = createSlice({
  name: "contactUsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(contactUs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(contactUs.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      notification.success({
        message: action.payload,
        duration: 3,
      });
    });
    builder.addCase(contactUs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      notification.error({
        message: action.payload,
        duration: 3,
      });
    });
  },
}).reducer;
