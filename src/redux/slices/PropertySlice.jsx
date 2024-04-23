import { getProperties } from "../../api/Property";
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

let intialState = {
  isLoading: false,
  success: "",
  isError: false,
  
};
