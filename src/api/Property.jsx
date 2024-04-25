import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_base_URL } from "../const/Const";
import axios from "axios";
import customAxios from "./Axios";

export const getProperties = createAsyncThunk(
  "getPropertiesReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`property`);
      return res.data;
    } catch (e) {
      console.log(e, "error");

      return rejectWithValue(e.response.data.message);
    }
  }
);
