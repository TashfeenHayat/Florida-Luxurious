import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilters } from "../api/Filters";

function useCommunities() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((s) => s.getFiltersReducer);
  useEffect(() => {
    dispatch(getFilters({}));
  }, [dispatch]);
  return { data, isLoading, isError };
}

export default useCommunities;
