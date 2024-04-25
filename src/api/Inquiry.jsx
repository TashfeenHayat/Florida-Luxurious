import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_base_URL } from "../const/Const";
import axios from "axios";
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
