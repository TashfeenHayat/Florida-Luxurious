import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getBlogs = createAsyncThunk(
  "getBlogsReducer",
  async function ({ agentId, limit, page }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`blog`, {
        params: { agentId, limit, page },
      });

      return res.data;
    } catch ({ response }) {
      //console.log(response);
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);

export const addBlog = createAsyncThunk(
  "addBlogReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`blog`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getBlog = createAsyncThunk(
  "getBlogReducer",
  async function (id, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`blog/${id}`);

      return res.data;
    } catch ({ response }) {
      // console.log(response.data);
      return rejectWithValue(response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "updateBlogReducer",
  async function (data, { rejectWithValue }) {
    try {
      const { id } = data;
      delete data.id;
      const res = await customAxios.patch(`blog/${id}`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "deleteBlogReducer",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await customAxios.delete(`blog/${id}`);
      dispatch(getBlogs({}));
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);
