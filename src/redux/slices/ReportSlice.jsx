import {
  getReports,
  addReport,
  getReport,
  updateReport,
  deleteReport,
} from "../../api/Report";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
let initialState = {
  isLoading: false,
  data: null,
  isError: false,
  errorCode: "",
};

export const getReportsSlice = createSlice({
  name: "getReportsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReports.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getReports.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.data = action.payload;
    });

    builder.addCase(getReports.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload.message;
      notification.error({
        message: "Something went wrong",
        description: payload.message,
        duration: 2,
      });
    });
  },
}).reducer;

export const addReportSlice = createSlice({
  name: "addReportReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addReport.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(addReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(addReport.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload);
      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;

export const getReportSlice = createSlice({
  name: "getReportReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReport.pending, (state, action) => {
      state.data = {};
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });

    builder.addCase(getReport.rejected, (state, action) => {
      state.data = {};
      state.isLoading = false;
      state.isError = true;
      state.errorCode = action.payload.code;
      notification.error({
        message: "Something went wrong",
        description: action.payload.message,
        duration: 2,
      });
    });
  },
}).reducer;

export const updateReportSlice = createSlice({
  name: "updateReportReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateReport.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(updateReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(updateReport.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;

export const deleteReportSlice = createSlice({
  name: "deleteReportReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteReport.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(deleteReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      console.log(action.payload);
    });

    builder.addCase(deleteReport.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      notification.error({
        message: "Something went wrong",
        description: action.payload,
        duration: 2,
      });
    });
  },
}).reducer;
