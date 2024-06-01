import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getProperties = createAsyncThunk(
  "getPropertiesReducer",
  async function (
    { agentId, limit, page, status, filterId, mlsOnly },
    { rejectWithValue }
  ) {
    try {
      const res = await customAxios.get(`property`, {
        params: {
          agentId,
          limit,
          page,
          status,
          filterId,
          mlsOnly,
        },
      });
      return res.data;
    } catch (e) {
      console.log(e, "error");

      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getProperty = createAsyncThunk(
  "getPropertyReducer",
  async function (id, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`property/${id}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const resetProperty = createAsyncThunk("resetPropertyReducer", () => {});
