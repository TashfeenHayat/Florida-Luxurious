import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../api/Press";

function usePress(limit, page) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.getPostsReducer);
  //console.log("usePress", data);
  useEffect(() => {
    // Always dispatch getPosts when limit or page changes
    dispatch(getPosts({ limit, page }));
  }, [dispatch, page, limit]);

  return { data, isLoading };
}

export default usePress;
