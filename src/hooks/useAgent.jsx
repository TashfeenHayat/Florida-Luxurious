import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgent, resetAgent } from "../api/Agents";

function useAgent(id) {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((s) => s.getAgentReducer);
  console.log(data, isError);
  useEffect(() => {
    dispatch(getAgent(id));
    return () => dispatch(resetAgent());
  }, [dispatch, id]);
  return { isLoading, data, isError };
}

export default useAgent;
