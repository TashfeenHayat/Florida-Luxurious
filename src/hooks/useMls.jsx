import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../api/Property";

function useMls(mlsOnly, limit, page) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertiesReducer);
  useEffect(() => {
    if (isLoading === false) {
      dispatch(getProperties({ mlsOnly, limit, page }));
    }
  }, [dispatch, page]);
  return { data, isLoading };
}

export default useMls;
