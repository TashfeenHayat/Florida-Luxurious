import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../api/Property";
function useProperties(agentId, limit, page, status, filterId) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertiesReducer);
  useEffect(() => {
    if (isLoading === false)
      dispatch(getProperties({ agentId, limit, page, status, filterId }));
  }, [dispatch, page, filterId]);
  return { data, isLoading };
}

export default useProperties;
