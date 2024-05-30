import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../api/Property";
function useProperties(agentId, limit, page, status) {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s.getPropertiesReducer);
  useEffect(() => {
    if (isLoading === false)
      dispatch(getProperties({ agentId, limit, page, status }));
  }, [dispatch, page]);
  return { data, isLoading };
}

export default useProperties;
