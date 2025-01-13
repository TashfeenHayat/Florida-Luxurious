import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "../api/Report";

function useReport(limit, page) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.getReportsReducer);
  //console.log(data?.Reports);
  let reports = data?.Reports;
  useEffect(() => {
    // Always dispatch getPosts when limit or page changes
    dispatch(getReports({ limit, page }));
  }, [dispatch, page, limit]);

  return { reports, isLoading };
}

export default useReport;
