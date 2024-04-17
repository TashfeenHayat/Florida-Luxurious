import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgents } from "../api/Agents";
function useTeamMembers() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getAgentsReducer);
  console.log(isLoading, data, "working");
  useEffect(() => {
    if (isLoading === false) dispatch(getAgents());
  }, [dispatch]);
  return { data, isLoading };
}

export default useTeamMembers;
