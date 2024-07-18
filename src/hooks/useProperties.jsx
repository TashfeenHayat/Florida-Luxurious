import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../api/Property";
function useProperties(agentId, limit, page, status, filterId, key) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertiesReducer);
  useEffect(() => {
    if (isLoading === false)
      dispatch(getProperties({ agentId, limit, page, status, filterId, key }));
  }, [dispatch, page, filterId, key]);
  return { data, isLoading };
}

export default useProperties;
