import React from "react";
import { Button } from "antd";
function Buttons({
  children,
  classNam,
  width,
  bgColor,
  textColor,
  type,
  Click,
}) {
  return (
    <div>
      <button
        className={classNam}
        style={{
          width: width,
          justifyContent: "center",
          background: bgColor,
          color: textColor,
        }}
        type={type}
        onClick={Click}
      >
        {children}
      </button>
    </div>
  );
}

export default Buttons;
