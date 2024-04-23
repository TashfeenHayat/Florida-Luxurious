import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_base_URL } from "../const/Const";
import axios from "axios";
import customAxios from './Axios';


export const getAgents = createAsyncThunk(
  "getAgentsReducer",
  async function (key, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`agent`, {
        params: { key },
      });

      return res.data;
    } catch ({ response }) {
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);

export const addAgent = createAsyncThunk(
  "addAgentReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`agent`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getAgent = createAsyncThunk(
  "getAgentReducer",
  async function (id, { rejectWithValue }) {
    console.log(id);
    try {
      const res = await customAxios.get(`agent/${id}`);

      return res.data;
    } catch ({ response }) {
      console.log(response.data);
      return rejectWithValue(response.data);
    }
  }
);

export const updateAgent = createAsyncThunk(
  "updateAgentReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.patch(`agent/${data.id}`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const deleteAgent = createAsyncThunk(
  "deleteAgentReducer",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await customAxios.delete(`agent/${id}`);
      dispatch(getAgents());
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const resetAgent = createAsyncThunk("resetAgentReducer", () => {});
