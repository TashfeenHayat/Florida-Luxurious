import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReport } from "../api/Report";
function useReportsDetails(id) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getReportReducer);

  console.log(data, "Reports12");
  useEffect(() => {
    // Always dispatch getPosts when limit or page changes
    dispatch(getReport(id));
  }, [dispatch, id]);
  return { isLoading, data };
}

export default useReportsDetails;
