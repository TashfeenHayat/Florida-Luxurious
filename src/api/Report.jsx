import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getReports = createAsyncThunk(
  "getReportsReducer",
  async function ({ limit, page }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`Report`, {
        params: { limit, page },
      });
      // console.log(res.data);
      return res.data;
    } catch ({ response }) {
      //console.log(response);
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);

export const addReport = createAsyncThunk(
  "addReportReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`Report`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getReport = createAsyncThunk(
  "getReportReducer",
  async function (id, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`report/${id}`);

      return res.data;
    } catch ({ response }) {
      //console.log(response.data);
      return rejectWithValue(response.data);
    }
  }
);

export const updateReport = createAsyncThunk(
  "updateReportReducer",
  async function (data, { rejectWithValue }) {
    try {
      const { id } = data;
      delete data.id;
      const res = await customAxios.patch(`report/${id}`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const deleteReport = createAsyncThunk(
  "deleteReportReducer",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await customAxios.delete(`report/${id}`);
      dispatch(getReports({}));
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);
