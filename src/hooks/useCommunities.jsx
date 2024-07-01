import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilters } from "../api/Filters";

function useCommunities(limit, page) {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((s) => s.getFiltersReducer);
  useEffect(() => {
    dispatch(getFilters({ limit, page }));
  }, [limit, page]);
  return { data, isLoading, isError };
}

export default useCommunities;
