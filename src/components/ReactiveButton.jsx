import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import "./ReactiveButton.css";

const buttonVariants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: "100%",
  },
  exit: {
    opacity: 0,
    scaleX: 0,
  },
};

export default function ReactiveButton({
  initialText,
  btnState,
  successText = "Success",
  onClickFunction,
}) {
  const onAnimationComplete = () => {
    console.log("DONE");
  };

  return (
    <div className="reactive-btn">
      <AnimatePresence>
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="btn"
          onClick={onClickFunction}
          disabled={btnState === "success" ? true : false}
          onAnimationComplete={onAnimationComplete}
        >
          {btnState === "idle" && initialText}

          {btnState === "success" && successText}
        </motion.button>
      </AnimatePresence>
    </div>
  );
}
