import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_base_URL } from "../const/Const";
import axios from "axios";
export const getAgents = createAsyncThunk(
  "getAgentsReducer",
  async function (key, { rejectWithValue }) {
    try {
      const res = await axios.get(`${api_base_URL}agent`, {
        params: { key }
      });
      return res.data;
    } catch (e) {
      // console.log(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
