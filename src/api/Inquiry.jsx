import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const contactUs = createAsyncThunk(
  "contactUsReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`inquiry`, data);
      return res.data;
    } catch (e) {
      console.log(e, "error");

      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getInquiries = createAsyncThunk(
  "getInquiriesReducer",
  async function ({ page = 1, limit = 10, ...other }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`inquiry`, {
        params: { ...other, page, limit },
      });

      return res.data;
    } catch ({ response }) {
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);