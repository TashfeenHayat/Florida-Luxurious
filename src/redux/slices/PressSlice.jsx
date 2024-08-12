import {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} from "../../api/Press";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
let initialState = {
  isLoading: false,
  data: null,
  isError: false,
  errorCode: "",
};

export const getPostsSlice = createSlice({
  name: "getPostsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.data = action.payload;
    });

    builder.addCase(getPosts.rejected, (state, { payload }) => {
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

export const addPostSlice = createSlice({
  name: "addPostReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPost.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(addPost.rejected, (state, action) => {
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

export const getPostSlice = createSlice({
  name: "getPostReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state, action) => {
      state.data = {};
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });

    builder.addCase(getPost.rejected, (state, action) => {
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

export const updatePostSlice = createSlice({
  name: "updatePostReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(updatePost.rejected, (state, action) => {
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

export const deletePostSlice = createSlice({
  name: "deletePostReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deletePost.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(deletePost.rejected, (state, action) => {
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
