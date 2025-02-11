import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilters } from "../api/Filters";

function useAllCommunities() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (state) => state.getAllFiltersReducer
  );

  useEffect(() => {
    dispatch(getAllFilters());
  }, [dispatch]);

  return { data, isLoading, isError };
}

export default useAllCommunities;
