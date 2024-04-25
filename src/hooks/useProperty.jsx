import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty, resetProperty } from "../api/Property";

function useProperty(id) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertyReducer);
  useEffect(() => {
    dispatch(getProperty(id));
    return () => dispatch(resetProperty());
  }, [dispatch]);
  return { isLoading, data };
}

export default useProperty;