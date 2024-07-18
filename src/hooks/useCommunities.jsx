import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilters } from "../api/Filters";

function useCommunities(limit, page, key) {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((s) => s.getFiltersReducer);
  useEffect(() => {
    dispatch(getFilters({ limit, page, key }));
  }, [limit, page, key]);
  return { data, isLoading, isError };
}

export default useCommunities;
