import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../api/Press";

function usePressDetail(id) {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.getPostReducer);

  useEffect(() => {
    // Always dispatch getPosts when limit or page changes
    dispatch(getPost(id));
  }, [dispatch, id]);

  return { data, isLoading };
}

export default usePressDetail;
