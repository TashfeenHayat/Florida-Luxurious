import React from "react";
import LoadingImage from "../assets/LoadingFlorida.gif";
function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img src={LoadingImage} width={"50%"} />
    </div>
  );
}

export default Loading;
