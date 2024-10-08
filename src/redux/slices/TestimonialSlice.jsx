import {
  getTestimonials,
  addTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../api/Testimonial";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
let initialState = {
  isLoading: false,
  data: null,
  isError: false,
  errorCode: "",
};

export const getTestimonialsSlice = createSlice({
  name: "getTestimonialsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTestimonials.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getTestimonials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.data = action.payload;
    });

    builder.addCase(getTestimonials.rejected, (state, { payload }) => {
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

export const addTestimonialSlice = createSlice({
  name: "addTestimonialReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addTestimonial.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(addTestimonial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(addTestimonial.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload);
      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;

export const getTestimonialSlice = createSlice({
  name: "getTestimonialReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTestimonial.pending, (state, action) => {
      state.data = {};
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getTestimonial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });

    builder.addCase(getTestimonial.rejected, (state, action) => {
      state.data = {};
      state.isLoading = false;
      state.isError = true;
      state.errorCode = action.payload.code;
      notification.error({
        message: "Something went wrong",
        description: action.payload.message,
        duration: 2,
      });
    });
  },
}).reducer;

export const updateTestimonialSlice = createSlice({
  name: "updateTestimonialReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateTestimonial.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(updateTestimonial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(updateTestimonial.rejected, (state, action) => {
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

export const deleteTestimonialSlice = createSlice({
  name: "deleteTestimonialReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteTestimonial.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(deleteTestimonial.rejected, (state, action) => {
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
