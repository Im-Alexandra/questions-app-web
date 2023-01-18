import React, { useRef, useState } from "react";
import "./NewGame.css";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { AnimatePresence, motion } from "framer-motion";

import arrow from "../assets/leftArrowOrange.svg";
import deleteIcon from "../assets/closeBlack.svg";
import CategoryPicker from "../components/CategoryPicker";

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

const playerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function NewGame() {
  const navigate = useNavigate();
  const [newPlayer, setNewPlayer] = useState("");
  const [players, setPlayers] = useState([]);
  const newPlayerInput = useRef(null);

  //category picker state
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("fun");

  const { documents } = useCollection("questions");

  const handleAdd = (e) => {
    const newInput = newPlayer.trim();
    if (newInput && !players.includes(newInput)) {
      setPlayers((prevPlayers) => [...prevPlayers, newInput]);
    }
    setNewPlayer("");
    newPlayerInput.current.focus();
  };

  const handlePlayerDelete = (player) => {
    let filteredPlayers = players.filter((p) => p !== player);
    setPlayers((prevPlayers) => [...filteredPlayers]);
  };

  const playGame = () => {
    //console.log("players: ", players);
    const catArray = [option1, option2, option3, option4].filter(
      (str) => str !== ""
    );
    console.log("categories: ", catArray);

    //get back all the eligible questions and reshuffle them
    const filteredDocs = documents.filter((doc) => {
      if (doc.tags.every((ai) => catArray.includes(ai))) {
        return true;
      } else {
        return false;
      }
    });
    console.log(filteredDocs);
    const reshuffledQuestions = filteredDocs
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    //pick first 5
    const questions = reshuffledQuestions.slice(0, 5);
    console.log(questions);

    navigate("/new-game/play", {
      state: {
        questions,
        players,
        currentIndex: 0,
        categories: catArray,
      },
    });
  };

  const handleCategoryChange = (e) => {
    if (e.target.name === "option1") {
      setOption1(e.target.value);
    } else if (e.target.name === "option2") {
      setOption2(e.target.value);
    } else if (e.target.name === "option3") {
      setOption3(e.target.value);
    } else if (e.target.name === "option4") {
      setOption4(e.target.value);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container new-game"
    >
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        NEW GAME
      </h2>
      <label>
        <span>I am playing with:</span>
        <div className="players">
          <input
            ref={newPlayerInput}
            type="text"
            onChange={(e) => setNewPlayer(e.target.value)}
            value={newPlayer}
          ></input>
          <button
            className="btn"
            onClick={handleAdd}
            disabled={
              players.length === 4 || players.includes(newPlayer) ? true : false
            }
          >
            ADD
          </button>
        </div>
      </label>
      <AnimatePresence>
        {players.length === 4 && (
          <motion.p
            variants={playerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="error"
          >
            Maximum players reached
          </motion.p>
        )}
      </AnimatePresence>
      <div className="current-players">
        <AnimatePresence>
          {players.length !== 0 && (
            <motion.p
              variants={playerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Current players:
            </motion.p>
          )}
          {players.map((p, i) => (
            <motion.p
              variants={playerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={p}
            >
              {i + 1}. {p}
              <img
                src={deleteIcon}
                alt="remove player"
                onClick={() => handlePlayerDelete(p)}
              />
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
      <CategoryPicker
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}
        change={handleCategoryChange}
      />
      <button className="btn mt-38 full-width" onClick={playGame}>
        Start new game
      </button>
    </motion.div>
  );
}
