import { contactUs, getInquiries } from "../../api/Inquiry";
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
    builder.addCase(contactUs.pending, (state) => {
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

export const getInquirySlice = createSlice({
  name: "getInquiryReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getInquiries.pending, (state) => {
      state.data = {};
      state.loading = true;
      state.error = false;
    });

    builder.addCase(getInquiries.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    });

    builder.addCase(getInquiries.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = true;
      state.errorCode = action.payload.code;
      console.log(action);
      notification.error({
        message: "Something went wrong",
        description: action.payload.message,
        duration: 2,
      });
    });
  },
}).reducer;
