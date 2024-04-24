import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty, resetAgent } from "../api/Property";

function useAgent(id) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getAgentReducer);
  useEffect(() => {
    dispatch(getProperty(id));
    return () => dispatch(resetAgent());
  }, [dispatch]);
  return { isLoading, data, isError };
}

export default useAgent;
