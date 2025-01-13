import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../api/Blogs";

function useBlogs(limit, page, agentId) {
  //console.log(page, limit, "checking");
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getBlogsReducer);
  useEffect(() => {
    if (isLoading === false) dispatch(getBlogs({ agentId, limit, page }));
  }, [dispatch, page, limit]);
  return { data, isLoading };
}

export default useBlogs;
