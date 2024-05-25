import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../api/Property";
function useProperties(agentId) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertiesReducer);
  useEffect(() => {
    if (isLoading === false) dispatch(getProperties({ agentId }));
  }, [dispatch]);
  return { data, isLoading };
}

export default useProperties;
