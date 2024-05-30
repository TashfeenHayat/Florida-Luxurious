import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilter } from "../api/Filters";

function useCommunity(id) {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((s) => s.getFilterReducer);
  useEffect(() => {
    dispatch(getFilter(id));
  }, [dispatch, id]);
  return { data, isLoading, isError };
}

export default useCommunity;
