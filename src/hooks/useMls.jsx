import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProperties } from "../api/Property";

function useMls(
  mlsOnly,
  limit,
  page,
  minBedCount,
  maxBedCount,
  minBathCount,
  maxBathCount,
  minPrice
) {
  const dispatch = useDispatch();

  useEffect(() => {
    
    //console.log(minPrice);
    callApi();
  }, [
    dispatch,
    page,
    minBedCount,
    maxBedCount,
    minBathCount,
    maxBathCount,
    minPrice,
  ]);

  const callApi = () => {
    dispatch(
      getProperties({
        mlsOnly,
        limit,
        page,
        minBedCount,
        maxBedCount,
        minBathCount,
        maxBathCount,
        minPrice,
      })
    );
  };
}

export default useMls;
