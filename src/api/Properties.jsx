import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getProperties = createAsyncThunk(
  "getPropertiesReducer",
  async function ({ page = 1, limit = 10, ...other }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`property`, {
        params: { ...other, page, limit },
      });

      return res.data;
    } catch ({ response }) {
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);

export const addProperty = createAsyncThunk(
  "addPropertyReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`property`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getProperty = createAsyncThunk(
  "getPropertyReducer",
  async function (id, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`property/${id}`);

      return res.data;
    } catch ({ response }) {
      console.log(response.data);
      return rejectWithValue(response.data);
    }
  }
);

export const updateProperty = createAsyncThunk(
  "updatePropertyReducer",
  async function ({ id, others }, { rejectWithValue }) {
    console.log(others);
    try {
      const res = await customAxios.patch(`property/${id}`, { ...others });
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "deletePropertyReducer",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await customAxios.delete(`property/${id}`);
      dispatch(getProperties({}));
      return res.data;
    } catch ({ response }) {
      console.log(response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);
