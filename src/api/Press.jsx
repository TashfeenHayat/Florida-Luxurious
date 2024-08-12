import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getPosts = createAsyncThunk(
  "getPostsReducer",
  async function ({ limit, page }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`press`, {
        params: { limit, page },
      });

      return res.data;
    } catch ({ response }) {
      console.log(response);
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);

export const addPost = createAsyncThunk(
  "addPostReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`press`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getPost = createAsyncThunk(
  "getPostReducer",
  async function (id, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`press/${id}`);

      return res.data;
    } catch ({ response }) {
      console.log(response.data);
      return rejectWithValue(response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "updatePostReducer",
  async function (data, { rejectWithValue }) {
    try {
      const { id } = data;
      delete data.id;
      const res = await customAxios.patch(`press/${id}`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const deletePost = createAsyncThunk(
  "deleteBlogReducer",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await customAxios.delete(`press/${id}`);
      dispatch(getPosts({}));
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);
