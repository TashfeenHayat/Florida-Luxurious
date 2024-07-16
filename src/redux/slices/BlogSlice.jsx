import {
  getBlogs,
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../../api/Blogs";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
let initialState = {
  isLoading: false,
  data: null,
  isError: false,
  errorCode: "",
};

export const getBlogsSlice = createSlice({
  name: "getBlogsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.data = action.payload;
    });

    builder.addCase(getBlogs.rejected, (state, { payload }) => {
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

export const addBlogSlice = createSlice({
  name: "addBlogReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addBlog.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(addBlog.rejected, (state, action) => {
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

export const getBlogSlice = createSlice({
  name: "getBlogReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBlog.pending, (state, action) => {
      state.data = {};
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });

    builder.addCase(getBlog.rejected, (state, action) => {
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

export const updateBlogSlice = createSlice({
  name: "updateBlogReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateBlog.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(updateBlog.rejected, (state, action) => {
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

export const deleteBlogSlice = createSlice({
  name: "deleteBlogReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteBlog.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(deleteBlog.rejected, (state, action) => {
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
