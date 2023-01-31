import React from "react";
import ReactDOM from "react-dom";
import "./InfoModal.css";
import close from "../assets/closeBlack.svg";
import { motion } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
  exit: { opacity: 0 },
};

export default function InfoModal({ children, handleClose }) {
  return ReactDOM.createPortal(
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="infoModal-backdrop"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="infoModal"
      >
        <motion.img
          whileTap={{ scale: 1.5 }}
          src={close}
          alt="close icon"
          onClick={handleClose}
        />
        {children}
      </motion.div>
    </motion.div>,
    document.querySelector("#modal")
  );
}
