import React, { useState } from "react";
import "./MyQuestions.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import arrow from "../../assets/leftArrowOrange.svg";
import timeWhite from "../../assets/timeWhite.svg";
import timeOrange from "../../assets/timeOrange.svg";
import heartWhite from "../../assets/heartWhite.svg";
import heartOrange from "../../assets/heartOrange.svg";
import plusWhite from "../../assets/plusWhite.svg";
import plusOrange from "../../assets/plusOrange.svg";
import Saved from "./Saved";
import Favourites from "./Favourites";
import Add from "./Add";

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

export default function MyQuestions() {
  const navigate = useNavigate();
  const [currentSubPage, setCurrentSubPage] = useState("saved");

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container my-questions"
    >
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        QUESTIONS
      </h2>
      <div className="top-nav">
        <div className="wrapper">
          <div
            className={currentSubPage === "saved" ? "circle active" : "circle"}
            onClick={() => setCurrentSubPage("saved")}
          >
            <img
              src={currentSubPage === "saved" ? timeWhite : timeOrange}
              alt="saved"
            />
          </div>
        </div>
        <div className="wrapper">
          <div
            className={
              currentSubPage === "favourites" ? "circle active" : "circle"
            }
            onClick={() => setCurrentSubPage("favourites")}
          >
            <img
              src={currentSubPage === "favourites" ? heartWhite : heartOrange}
              alt="favourites"
            />
          </div>
        </div>
        <div className="wrapper">
          <div
            className={currentSubPage === "add" ? "circle active" : "circle"}
            onClick={() => setCurrentSubPage("add")}
          >
            <img
              src={currentSubPage === "add" ? plusWhite : plusOrange}
              alt="add"
            />
          </div>
        </div>
      </div>
      {currentSubPage === "saved" && <Saved />}
      {currentSubPage === "favourites" && <Favourites />}
      {currentSubPage === "add" && <Add />}
    </motion.div>
  );
}
