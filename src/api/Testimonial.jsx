import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./Axios";

export const getTestimonials = createAsyncThunk(
  "getTestimonialsReducer",
  async function ({ agentId, limit, page }, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`Testimonial`, {
        params: { agentId, limit, page },
      });

      return res.data;
    } catch ({ response }) {
      console.log(response);
      const { status, message } = response;
      return rejectWithValue({ status, message });
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "addTestimonialReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await customAxios.post(`Testimonial`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getTestimonial = createAsyncThunk(
  "getTestimonialReducer",
  async function (id, { rejectWithValue }) {
    try {
      const res = await customAxios.get(`Testimonial/${id}`);

      return res.data;
    } catch ({ response }) {
      console.log(response.data);
      return rejectWithValue(response.data);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "updateTestimonialReducer",
  async function (data, { rejectWithValue }) {
    try {
      const { id } = data;
      delete data.id;
      const res = await customAxios.patch(`Testimonial/${id}`, data);
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "deleteTestimonialReducer",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await customAxios.delete(`Testimonial/${id}`);
      dispatch(getTestimonials({}));
      return res.data;
    } catch ({ response }) {
      // console.log(e.response.data.message);
      const { status, message } = response.data;
      return rejectWithValue({ status, message });
    }
  }
);
