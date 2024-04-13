import React from "react";
import { Button } from "antd";
function Buttons({ children, classNam, width, bgColor, textColor, type }) {
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
      >
        {children}
      </button>
    </div>
  );
}

export default Buttons;
