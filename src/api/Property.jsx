import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getProperties = createAsyncThunk(
  "getPropertiesReducer",
  async function (
    {
      agentId,
      limit,
      page,
      status,
      filterId,
      mlsOnly,
      minBedCount,
      minBathCount,
      maxBathCount,
      minprice = 600000,
      maxprice,
      cities,
      key,
    },
    { rejectWithValue }
  ) {
    try {
      console.log(minprice, "in api");
      const res = await customAxios.get(`property`, {
        params: {
          key,
          agentId,
          limit,
          page,
          status,
          filterId,
          mlsOnly,
          minBedCount,
          minBathCount,
          maxBathCount,
          minprice,
          maxprice,
          cities,
        },
      });
      return res.data;
    } catch (e) {
      //console.log(e, "error");

      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getProperty = createAsyncThunk(
  "getPropertyReducer",
  async function ({ id, mlsOnly }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`property/${id}`, {
        params: {
          mlsOnly,
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const resetProperty = createAsyncThunk("resetPropertyReducer", () => {});



