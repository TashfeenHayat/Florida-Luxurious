import { signInAdmin } from "../../api/Auth";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
let initialState = {
  isLoading: false,
  success: false,
  isError: false,
};

const signInSlice = createSlice({
  name: "signInReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signInAdmin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(signInAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.success = true;
      console.log(action.payload);
      notification.success({
        message: "Login Successful",
        description: "User logged",
        duration: 2,
      });
    });

    builder.addCase(signInAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.success = false;

      notification.error({
        message: "Login Failure",
        description: action.payload,
        duration: 2,
      });
    });
  },
});

export default signInSlice.reducer;
