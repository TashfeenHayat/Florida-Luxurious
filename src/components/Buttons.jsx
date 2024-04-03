import React from "react";
import { Button } from "antd";
function Buttons({ children, classNam, width }) {
  return (
    <div>
      <button
        className={classNam}
        style={{ width: width, justifyContent: "center" }}
      >
        {children}
      </button>
    </div>
  );
}

export default Buttons;
