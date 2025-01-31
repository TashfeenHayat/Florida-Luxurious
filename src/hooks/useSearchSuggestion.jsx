import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { SearchSuggestion } from "../api/Properties"; // Ensure the correct path

const useSearchSuggestions = (query) => {
  const dispatch = useDispatch();

  // Destructure state from Redux store
  const { suggestions, isLoading, isError, error } = useSelector(
    (state) => state.searchSuggestionsReducer
  );

  // Memoize dispatch function to prevent unnecessary re-renders
  const fetchSuggestions = useCallback(() => {
    if (query?.trim()) {
      dispatch(SearchSuggestion(query.trim()));
    }
  }, [query, dispatch]);

  // Trigger search suggestions fetch when query changes
  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return { suggestions, isLoading, isError, error };
};

export default useSearchSuggestions;
