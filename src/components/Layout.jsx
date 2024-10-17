import React from "react";
import { motion } from "framer-motion";

function Layout({ children }) {
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // easeInOut
      }}
    >
      {children}
    </motion.div>
  );
}

export default Layout;
