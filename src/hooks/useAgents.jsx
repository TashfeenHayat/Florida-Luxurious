import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgents } from "../api/Agents";
function useAgents(limit, page) {
  console.log(page, limit, "checking");
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getAgentsReducer);
  useEffect(() => {
    if (isLoading === false) dispatch(getAgents({ limit, page }));
  }, [dispatch, page, limit]);
  return { data, isLoading };
}

export default useAgents;
