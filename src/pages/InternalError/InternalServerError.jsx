import React from "react";
import Error from "../../assets/500.png";
function InternalServerError() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "black",
        justifyItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
      className="py-5"
    >
      <img src={Error} />
    </div>
  );
}

export default InternalServerError;
