import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty, resetProperty } from "../api/Property";

function useMlsDetail(id, mlsOnly) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertyReducer);
  useEffect(() => {
    dispatch(getProperty({ id, mlsOnly }));
    return () => dispatch(resetProperty());
  }, [dispatch, id]);
  return { isLoading, data };
}

export default useMlsDetail;
