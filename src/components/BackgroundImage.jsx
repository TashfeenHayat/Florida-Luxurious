import React, { Children } from "react";
function BackgroundImage({ Image, children }) {
  return (
    <div style={{ backgroundImage: `url(${Image})` }} className="bg-img">
      <div className="bg-img-shadow">{children}</div>
    </div>
  );
}

export default BackgroundImage;
