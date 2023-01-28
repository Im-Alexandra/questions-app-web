import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SaveGame.css";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AnimatePresence, motion } from "framer-motion";

import close from "../../assets/closeWhite.svg";
import arrowLeft from "../../assets/leftArrowWhite.svg";
import trash from "../../assets/trash.svg";
import check from "../../assets/checkWhite.svg";
import InfoModal from "../../components/InfoModal";

const pageVariants = {
  hidden: { opacity: 0, x: "100vw", rotate: 50 },
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

const errorVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

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

export default function SaveGame() {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const { addDocToSubcollectionNewId, response } = useFirestore("users");
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleKeyUp = (e) => {
    setError(null);
    const current = e.target.value.length;
    const currentText = document.getElementById("current");
    currentText.innerHTML = current;
  };

  const handleLeftArrowClick = () => {
    if (saved) {
      return;
    }
    /* const questions = location.state.questions;
    const players = location.state.players;
    const currentIndex = location.state.questions.length;
    const categories = location.state.categories;
    console.log("questions: ", location.state.questions);
    console.log("players: ", location.state.players);
    console.log("index: ", location.state.questions.length);
    console.log("categories: ", location.state.categories); */
    navigate(-1);
    /* navigate("/new-game/play", {
      state: {
        questions: questions,
        players: players,
        currentIndex: currentIndex,
        categories: categories,
      },
    }); */
  };

  const saveGame = () => {
    if (saved) {
      return;
    }
    const date = new Date().toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const game = {
      players: location.state.players,
      questions: location.state.questions,
      date,
      note,
    };
    /* console.log(game);
    console.log(user.uid); */

    if (note !== "") {
      setError(null);
      addDocToSubcollectionNewId(user.uid, "games", game);
    } else {
      setError("Note is required before saving");
    }
  };

  //fires when success from response changes
  useEffect(() => {
    if (response.success) {
      setSaved(true);
    }
  }, [response.success, navigate]);

  const onAnimationComplete = () => {
    navigate("/home");
  };
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="save-game-container"
    >
      <div className="save-game-page">
        <motion.img
          whileTap={{ scale: 1.5 }}
          className="icon"
          src={close}
          alt="close icon"
          onClick={() => {
            if (!saved) {
              setShowModal(true);
            }
          }}
        />
        <p className="date">
          {new Date().toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }) + ""}
        </p>
        <div className="textarea-wrapper">
          <textarea
            placeholder="Write notes about this session..."
            maxLength="120"
            onKeyUp={handleKeyUp}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            value={note}
          ></textarea>
          <div id="the-count">
            <span id="current">0</span>
            <span id="maximum">/ 120</span>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                variants={errorVariants}
                animate="visible"
                initial="hidden"
                exit="exit"
                className="error"
              >
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="players">
          {location.state.players &&
            location.state.players.map((p) => <p key={p}>{p}</p>)}
        </div>
        <AnimatePresence>
          {saved && (
            <motion.p
              variants={successMessageVariants}
              initial="hidden"
              animate="visible"
              className="saved"
              onAnimationComplete={onAnimationComplete}
            >
              Game saved
            </motion.p>
          )}
        </AnimatePresence>
        <div className="controls">
          <motion.img
            whileTap={{ scale: 1.5, rotate: 10 }}
            src={arrowLeft}
            alt="left"
            onClick={handleLeftArrowClick}
          />
          <motion.img
            whileTap={{ scale: 1.5 }}
            src={trash}
            alt="delete"
            onClick={() => {
              if (!saved) {
                setShowModal(true);
              }
            }}
          />
          <motion.img
            whileTap={{ scale: 1.5, rotate: -10 }}
            src={check}
            alt="right"
            onClick={saveGame}
          />
        </div>
      </div>

      {showModal && (
        <InfoModal
          handleClose={() => {
            setShowModal(false);
          }}
        >
          <p>Are you sure you want to leave without saving?</p>
          <button
            className="btn"
            onClick={() => {
              setShowModal(false);
              navigate("/home");
            }}
          >
            Dont save
          </button>
        </InfoModal>
      )}
    </motion.div>
  );
}
