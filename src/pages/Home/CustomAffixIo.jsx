import React, { useEffect, useRef, useState } from "react";

const CustomAffixIO = ({ offsetTop = 0, children }) => {
  const [fixed, setFixed] = useState(false);
  const placeholderRef = useRef(null);
  const affixRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const elm = placeholderRef.current;
      const elmClient = elm.getBoundingClientRect();
      const placeholderTop = elmClient.top;
      const containerHeight =
        elmClient.height + 30 - elm.offsetParent.getBoundingClientRect().height;

      if (placeholderTop <= offsetTop && placeholderTop >= containerHeight) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetTop]);

  return (
    <div
      ref={placeholderRef}
      style={{ height: fixed ? affixRef.current?.offsetHeight : undefined }}
    >
      <div
        ref={affixRef}
        style={{
          position: fixed ? "fixed" : "static",
          top: fixed ? offsetTop : undefined,
          zIndex: 1000,
          width: "100%", // You can adjust width depending on layout
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomAffixIO;
