import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getGlobalProperties = createAsyncThunk(
  "getGlobalPropertiesReducer",
  async function ({ limit, page, idx = "listing" }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`property/idx`, {
        params: {
          limit,
          page,
          idx,
        },
      });
      return res.data;
    } catch (e) {
      console.log(e, "error");

      return rejectWithValue(e.response.data.message);
    }
  }
);
