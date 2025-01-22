import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilters } from "../api/Filters"; // Assuming you've defined the API call to fetch all filters

function useAllCommunities() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (state) => state.getAllFiltersReducer
  ); // Use the new slice
  console.log(data);
  useEffect(() => {
    // Dispatch the action to fetch all filters (getAllFilters) when the hook is invoked
    dispatch(getAllFilters()); // No need to pass `page` or `key` because we fetch all filters in this case.
  }, [dispatch]); // You can keep `page` and `key` if you want to trigger updates based on them.

  return { data, isLoading, isError };
}

export default useAllCommunities;
