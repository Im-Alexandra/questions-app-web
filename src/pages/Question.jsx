import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Question.css";
import close from "../assets/closeWhite.svg";
import heart from "../assets/heartWhite.svg";
import leftArrow from "../assets/leftArrowWhite.svg";
import time from "../assets/timeWhite.svg";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";
import { AnimatePresence, motion } from "framer-motion";

import svg0 from "../assets/background/0.svg";
import svg1 from "../assets/background/1.svg";
import svg2 from "../assets/background/2.svg";
import svg3 from "../assets/background/3.svg";
import svg4 from "../assets/background/4.svg";
import svg5 from "../assets/background/5.svg";
import svg6 from "../assets/background/6.svg";
import svg7 from "../assets/background/7.svg";
import svg8 from "../assets/background/8.svg";
import svg9 from "../assets/background/9.svg";
import svg10 from "../assets/background/10.svg";
import svg11 from "../assets/background/11.svg";
import svg12 from "../assets/background/12.svg";
import svg13 from "../assets/background/13.svg";

const successMessageVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    y: 0,
    opacity: [0, 1, 0],
    transition: {
      type: "tween",
      delay: 0.3,
      duration: 1.8,
      ease: "easeOut",
    },
  },
};

const pageVariants = {
  hidden: { opacity: 0, x: "-100vw", rotate: -50 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", duration: 0.7 },
  },
  exit: {
    opacity: 0,
    /* x: "-100vw",
    rotate: -50,
    transition: { type: "spring", duration: 0.7 }, */
  },
};

export default function Question() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { addDocToSubcollection, response } = useFirestore("users");
  //using this to know which subCollection was just updated
  const [subCol, setSubCol] = useState({
    message: "",
    favourites: false,
    saved: false,
  });
  //weird state alert
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(location.state.currentIndex);

  useEffect(() => {
    console.log(location.state);
  }, [location.state]);

  //fires when success from response changes
  useEffect(() => {
    if (response.success) {
      //TODO: add animation to show success
      console.log(subCol);
    }
  }, [response.success, subCol]);

  const saveToFavourites = () => {
    let questionId = location.state.questions[currentIndex].id;
    let questionContent = {
      question: location.state.questions[currentIndex].question,
      tags: location.state.questions[location.state.currentIndex].tags,
    };
    addDocToSubcollection(user.uid, "favourites", questionId, questionContent);
    setSubCol({ ...subCol, message: "Saved to favourites", favourites: true });
  };

  const handleArrowClick = (e) => {
    if (e.target.alt === "left" && currentIndex === 0) {
      //console.log("This is the first question, go back to new game page");
      navigate("/new-game");
    } else if (e.target.alt === "left" && currentIndex !== 0) {
      setSubCol({ message: "", saved: false, favourites: false });
      setCurrentIndex(currentIndex - 1);
    } else if (
      e.target.alt === "right" &&
      currentIndex + 1 === location.state.questions.length
    ) {
      //console.log("This is the last question, go to save the game page");
      navigate("/new-game/save", {
        state: {
          questions: location.state.questions,
          players: location.state.players,
        },
      });
    } else if (
      e.target.alt === "right" &&
      currentIndex + 1 !== location.state.questions.length
    ) {
      setSubCol({ message: "", saved: false, favourites: false });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const saveToSaved = () => {
    let questionId = location.state.questions[currentIndex].id;
    let questionContent = {
      question: location.state.questions[currentIndex].question,
      tags: location.state.questions[location.state.currentIndex].tags,
      players: location.state.players,
    };
    addDocToSubcollection(user.uid, "saved", questionId, questionContent);
    setSubCol({ ...subCol, message: "Saved for later", saved: true });
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="question-container"
      style={{ originX: 1, originY: 1 }}
    >
      <div className="question-page">
        <motion.img
          whileTap={{ scale: 1.5 }}
          className="icon"
          src={close}
          alt="close icon"
          onClick={() => {
            navigate("/new-game");
          }}
        />
        {location.state.questions.length !== 0 && (
          <>
            <AnimatePresence mode="wait">
              <motion.p
                key={location.state.questions[currentIndex].question}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="question"
              >
                {location.state.questions[currentIndex].question}
              </motion.p>
            </AnimatePresence>
            {response.error && <p className="error">{response.error}</p>}

            {/* -------------------------- CONTROLS BELOW -------------------------- */}
            <div className="controls">
              <AnimatePresence>
                <motion.p
                  key={subCol.message}
                  variants={successMessageVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ x: "-50%" }}
                  className="success-message"
                >
                  {subCol.message}
                </motion.p>
              </AnimatePresence>
              <div className="top">
                <motion.img
                  whileTap={{ scale: 1.9, rotate: 10 }}
                  className="controls-icon"
                  src={heart}
                  alt=""
                  onClick={saveToFavourites}
                  style={subCol.favourites ? { opacity: 0.5 } : {}}
                />
              </div>

              <div className="mid">
                <motion.img
                  whileTap={{ scale: 1.7, rotate: 10 }}
                  className="controls-icon"
                  src={leftArrow}
                  alt="left"
                  onClick={handleArrowClick}
                />
                {location.state.questions && (
                  <p>
                    {currentIndex + 1}/{location.state.questions.length}
                  </p>
                )}
                <motion.img
                  whileTap={{ scale: 1.7, rotate: 170 }}
                  style={{ rotate: 180 }}
                  className="controls-icon"
                  src={leftArrow}
                  alt="right"
                  onClick={handleArrowClick}
                />
              </div>

              <div className="bot">
                <motion.img
                  whileTap={{ scale: 1.9, rotate: -10 }}
                  className="controls-icon"
                  src={time}
                  alt=""
                  onClick={saveToSaved}
                  style={subCol.saved ? { opacity: 0.5 } : {}}
                />
              </div>
            </div>
          </>
        )}
        {location.state.questions.length === 0 && (
          <>
            <p>
              Unfortunately, there are no questions within these set of
              categories yet.
            </p>
            <p>
              Categories picked: {location.state.categories.map((c) => c + " ")}
            </p>
          </>
        )}
        <div className="svg-wrapper">
          <img src={svg0} alt="floating background" />
          <img src={svg1} alt="floating background" />
          <img src={svg2} alt="floating background" />
          <img src={svg3} alt="floating background" />
          <img src={svg4} alt="floating background" />
          <img src={svg5} alt="floating background" />
          <img src={svg6} alt="floating background" />
          <img src={svg7} alt="floating background" />
          <img src={svg8} alt="floating background" />
          <img src={svg9} alt="floating background" />
          <img src={svg10} alt="floating background" />
          <img src={svg11} alt="floating background" />
          <img src={svg12} alt="floating background" />
          <img src={svg13} alt="floating background" />
        </div>
      </div>
    </motion.div>
  );
}
