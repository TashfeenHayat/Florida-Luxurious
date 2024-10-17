import React from "react";
// import { motion } from "framer-motion";

function Layout({ children }) {
  // const variants = {
  //   initial: {
  //     height: "100vh",
  //     bottom: 0,
  //   },
  //   animate: {
  //     height: 0,
  //     transition: {
  //       duration: 1.5,
  //       ease: [0.87, 0, 0.13, 1],
  //     },
  //   },
  // };

  return (
    <div
    // className="relative z-50 w-full bg-black"
    // initial="initial"
    // animate="animate"
    // // exit="hidden"
    // variants={variants}
    // transition={{
    //   duration: 0.8,
    //   ease: [0.42, 0, 0.58, 1], // easeInOut
    // }}
    >
      {children}
    </div>
  );
}

export default Layout;
