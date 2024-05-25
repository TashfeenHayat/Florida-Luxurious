import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../api/Property";
function useProperties(agentId, limit, page) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertiesReducer);
  useEffect(() => {
    if (isLoading === false) dispatch(getProperties({ agentId, limit, page }));
  }, [dispatch]);
  return { data, isLoading };
}

export default useProperties;
