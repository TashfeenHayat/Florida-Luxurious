import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_base_URL } from "../const/Const";
import axios from "axios";
export const signInAdmin = createAsyncThunk(
  "signInReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await axios.post(`${api_base_URL}user/login`, data);
      console.log(res.data.user);
      localStorage.setItem("user", res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (e) {
      // console.log(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
