import {
    getFilters,
    addFilter,
    getFilter,
    updateFilter,
    deleteFilter,
  } from "../../api/Filters";
  import { createSlice } from "@reduxjs/toolkit";
  import { notification } from "antd";
  let initialState = {
    isLoading: false,
    data: null,
    isError: false,
    errorCode: "",
  };
  
  export const getFiltersSlice = createSlice({
    name: "getFiltersReducer",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getFilters.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      });
  
      builder.addCase(getFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.data = action.payload;
      });
  
      builder.addCase(getFilters.rejected, (state, { payload }) => {
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
  
  export const addFilterSlice = createSlice({
    name: "addFilterReducer",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(addFilter.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  
      builder.addCase(addFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        console.log(action.payload);
      });
  
      builder.addCase(addFilter.rejected, (state, action) => {
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
  
  export const getFilterSlice = createSlice({
    name: "getFilterReducer",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getFilter.pending, (state) => {
        state.data = {};
        state.isLoading = true;
        state.isError = false;
      });
  
      builder.addCase(getFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      });
  
      builder.addCase(getFilter.rejected, (state, action) => {
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
  
  export const updateFilterSlice = createSlice({
    name: "updateFilterReducer",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(updateFilter.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  
      builder.addCase(updateFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      });
  
      builder.addCase(updateFilter.rejected, (state, action) => {
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
  
  export const deleteFilterSlice = createSlice({
    name: "deleteFilterReducer",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(deleteFilter.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  
      builder.addCase(deleteFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      });
  
      builder.addCase(deleteFilter.rejected, (state, action) => {
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
  
  