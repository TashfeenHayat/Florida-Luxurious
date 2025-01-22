import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getFilters = createAsyncThunk(
  "getFiltersReducer",
  async function ({ key, page, limit = 28 }, { rejectWithValue }) {
    try {
      // If no limit is provided, remove the limit and page from the query params
      const params = {};
      if (key) params.key = key;
      if (page) params.page = page;
      if (limit !== undefined) params.limit = limit;
      //console.log(limit);
      const res = await customAxios.get("filter", {
        params,
      });

     // console.log("bf", res.data);
      return res.data;
    } catch ({ response }) {
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);

export const addFilter = createAsyncThunk(
  "addFilterReducer",
  async function (data, { rejectWithValue }) {
    try {
      //console.log(data);
      const res = await customAxios.post(`filter`, data);
      //console.log(res);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);
export const getAllFilters = createAsyncThunk(
  "getAllFiltersReducer",
  async function (_, { rejectWithValue }) {
    try {
      const res = await customAxios.get("filter"); // Assuming your backend has an endpoint like this
      return res.data;
    } catch ({ response }) {
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getFilter = createAsyncThunk(
  "getFilterReducer",
  async function (id, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`filter/${id}`);

      return res.data;
    } catch ({ response }) {
      //console.log(response.data);
      return rejectWithValue(response.data);
    }
  }
);

export const updateFilter = createAsyncThunk(
  "updateFilterReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.patch(`filter/${data.id}`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const deleteFilter = createAsyncThunk(
  "deleteFilterReducer",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await customAxios.delete(`filter/${id}`);
      dispatch(getFilters({}));
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);
