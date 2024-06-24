import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalProperties } from "../api/GlobalProperties";

function useGlobalProperties(limit, page) {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (s) => s.getGlobalPropertiesReducer
  );
  useEffect(() => {
    dispatch(getGlobalProperties({ limit, page }));
  }, [dispatch, page]);

  return { data, isLoading, isError };
}
export default useGlobalProperties;
