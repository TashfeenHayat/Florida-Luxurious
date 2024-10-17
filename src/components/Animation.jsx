// PageWrapper.js
import { motion } from "framer-motion";

const Animation = ({ children }) => {
  const variants = {
    initial: {
      opacity: 0,
      clipPath: "circle(0% at 50% 50%)", // Start from a point
    },
    enter: {
      opacity: 1,
      clipPath: "circle(100% at 50% 50%)", // Expand to full circle
    },
    exit: {
      opacity: 0,
      clipPath: "circle(0% at 50% 50%)", // Collapse to a point
    },
    // initial: {
    //   opacity: 0,
    //   rotate: 360, // Start rotated
    //   scale: 0, // Start small
    // },
    // enter: {
    //   opacity: 1,
    //   rotate: 0, // Rotate back to normal
    //   scale: 1, // Scale to normal size
    // },
    // exit: {
    //   opacity: 0,
    //   rotate: -360, // Rotate out
    //   scale: 0, // Scale down
    // },
    // initial: {
    //   opacity: 0,
    //   x: 50, // Starting position on x-axis
    //   y: 50, // Starting position on y-axis
    // },
    // enter: {
    //   opacity: 1,
    //   x: 0,
    //   y: 0,
    // },
    // exit: {
    //   opacity: 0,
    //   x: -50, // Exit position on x-axis
    //   y: -50, // Exit position on y-axis
    // },
    // initial: { opacity: 0, y: "-100%" },
    // enter: { opacity: 1, y: "0%" },
    // exit: { opacity: 0, y: "100%" },
    // initial: { opacity: 0, x: "-100%" },
    // enter: { opacity: 1, x: "0%" },
    // exit: { opacity: 0, x: "100%" },
    // initial: {
    //   opacity: 1,
    //   scale: 0.5,
    // },
    // enter: {
    //   opacity: 1,
    //   scale: 1,
    // },
    // exit: {
    //   opacity: 0,
    //   scale: 0.5,
    // },
  };
  const pageWrapperStyle = {
    // position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background: "white",
  };
  return (
    <motion.div
      style={pageWrapperStyle}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 1.0, ease: "easeInOut" }} // Global transition duration
    >
      {children}
    </motion.div>
  );
};

export default Animation;
