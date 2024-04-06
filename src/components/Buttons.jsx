import React from "react";
import { Button } from "antd";
function Buttons({ children, classNam, width, bgColor, textColor }) {
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
      >
        {children}
      </button>
    </div>
  );
}

export default Buttons;
