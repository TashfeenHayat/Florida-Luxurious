import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../api/Blogs";

function useBlog(id) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getBlogReducer);
  useEffect(() => {
    if (isLoading === false) dispatch(getBlog(id));
  }, [dispatch, id]);
  return { data, isLoading };
}

export default useBlog;
