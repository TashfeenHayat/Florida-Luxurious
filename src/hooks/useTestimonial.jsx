import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonial } from "../api/Testimonial";

function useTestimonial(id) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getTestimonialReducer);
  console.log(data);
  useEffect(() => {
    if (isLoading === false) dispatch(getTestimonial(id));
  }, [dispatch, id]);
  return { data, isLoading };
}

export default useTestimonial;
