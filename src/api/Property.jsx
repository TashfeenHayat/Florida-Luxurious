import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_base_URL } from "../const/Const";
import axios from "axios";
import customAxios from "./Axios";

export const getProperties = createAsyncThunk(
  "getPropertiesReducer",
  async function ({ agentId }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`property`, {
        params: {
          agentId,
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
