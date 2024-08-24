import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./slices/signInSlice";
import {
  getAgentsSlice,
  addAgentSlice,
  getAgentSlice,
  updateAgentSlice,
  deleteAgentSlice,
  resetAgentSlice,
} from "./slices/AgentSlice";
import {
  getFiltersSlice,
  addFilterSlice,
  getFilterSlice,
  updateFilterSlice,
  deleteFilterSlice,
} from "./slices/FilterSlice";
import {
  getPropertiesSlice,
  addPropertySlice,
  getPropertySlice,
  updatePropertySlice,
  deletePropertySlice,
} from "./slices/PropertySlice";
import { contactUsSlice, getInquirySlice } from "./slices/ContactusSlice";
import { getGlobalPropertiesSlice } from "./slices/GlobalPropertiesSlice";
import {
  getBlogsSlice,
  addBlogSlice,
  getBlogSlice,
  updateBlogSlice,
  deleteBlogSlice,
} from "./slices/BlogSlice";
import {
  getPostsSlice,
  addPostSlice,
  getPostSlice,
  updatePostSlice,
  deletePostSlice,
} from "./slices/PressSlice";
import {
  getReportsSlice,
  addReportSlice,
  getReportSlice,
  updateReportSlice,
  deleteReportSlice,
} from "./slices/ReportSlice";

export const store = configureStore({
  reducer: {
    signInreducer: signInSlice,
    getAgentsReducer: getAgentsSlice,
    addAgentReducer: addAgentSlice,
    getAgentReducer: getAgentSlice,
    updateAgentReducer: updateAgentSlice,
    deleteAgentReducer: deleteAgentSlice,
    contactUsReducer: contactUsSlice,
    resetAgentReducer: resetAgentSlice,
    getFiltersReducer: getFiltersSlice,
    addFilterReducer: addFilterSlice,
    getFilterReducer: getFilterSlice,
    updateFilterReducer: updateFilterSlice,
    deleteFilterReducer: deleteFilterSlice,
    getPropertiesReducer: getPropertiesSlice,
    addPropertyReducer: addPropertySlice,
    getPropertyReducer: getPropertySlice,
    updatePropertyReducer: updatePropertySlice,
    deletePropertyReducer: deletePropertySlice,
    getInquiryReducer: getInquirySlice,
    getGlobalPropertiesReducer: getGlobalPropertiesSlice,
    getBlogsReducer: getBlogsSlice,
    addBlogReducer: addBlogSlice,
    getBlogReducer: getBlogSlice,
    updateBlogReducer: updateBlogSlice,
    deleteBlogReducer: deleteBlogSlice,
    getPostsReducer: getPostsSlice,
    addPostReducer: addPostSlice,
    getPostReducer: getPostSlice,
    updatePostReducer: updatePostSlice,
    deletePostReducer: deletePostSlice,
    getReportsReducer: getReportsSlice,
    addReportReducer: addReportSlice,
    getReportReducer: getReportSlice,
    updateReportReducer: updateReportSlice,
    deleteReportReducer: deleteReportSlice,
  },
});

export default store;
