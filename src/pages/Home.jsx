import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollingCards from "../components/ScrollingCards";

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container home"
    >
      <ScrollingCards title="Fun questions:" category="fun" questionCount="5" />
      <ScrollingCards
        title="Connection questions:"
        category="connection"
        questionCount="5"
      />
      <div className="cta-wrapper">
        <div className="cta">
          <h3>Ready to ask?</h3>
          <button className="btn" onClick={() => navigate("/new-game")}>
            PLAY
          </button>
        </div>
        <div className="cta">
          <h3>Previous games</h3>
          <button
            className="btn"
            onClick={() => navigate("/profile/game-records")}
          >
            See game records
          </button>
        </div>
      </div>
    </motion.div>
  );
}
