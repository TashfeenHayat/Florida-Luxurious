import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../api/Testimonial";

function useTestimonials(limit, page, agentId) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state) => state.getTestimonialsReducer
  );

  useEffect(() => {
    // Fetch data only if it's not loading and data is not already available
    if (!isLoading && (!data || data.length === 0)) {
      dispatch(getTestimonials({ agentId, limit, page }));
    }
  }, [dispatch, agentId, limit, page, isLoading, data]);

  return { data: data || [], isLoading }; // Ensure data is always an array
}

export default useTestimonials;
