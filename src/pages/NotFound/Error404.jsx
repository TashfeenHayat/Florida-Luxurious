import React from "react";
import Error from "../../assets/404.png";
function Error404() {
  return (
    <div
      style={{
        width: "100%",
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

export default Error404;
