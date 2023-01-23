import React, { useRef, useState } from "react";
import "./NewGame.css";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { AnimatePresence, motion } from "framer-motion";
import ReactSlider from "react-slider";

import arrow from "../../assets/leftArrowOrange.svg";
import deleteIcon from "../../assets/closeBlack.svg";
import CategoryPicker from "../../components/CategoryPicker";
import { useAuthContext } from "../../hooks/useAuthContext";

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
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [dataError, setDataError] = useState(null);

  //category picker state
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("fun");
  const [limit, setLimit] = useState(5);

  const { documents: questions } = useCollection("questions");
  const { documents: added } = useCollection(`users/${user.uid}/added`);

  const handleAdd = (e) => {
    const newInput = newPlayer.trim();
    if (newInput && !players.includes(newInput)) {
      setPlayers((prevPlayers) => [...prevPlayers, newInput]);
    }
    setNewPlayer("");
    setError(null);
    newPlayerInput.current.focus();
  };

  const handlePlayerDelete = (player) => {
    let filteredPlayers = players.filter((p) => p !== player);
    setPlayers((prevPlayers) => [...filteredPlayers]);
  };

  /* --------------------- QUERY --------------------- */
  const playGame = () => {
    if (players.length === 0) {
      setError("Add at least 1 player");
      document.getElementById("playerInput").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      return;
    }
    if (questions === null) {
      setDataError("Couldn´t fetch data");
      return;
    }
    setError(null);
    setDataError(null);
    //console.log("players: ", players);
    const catArray = [option1, option2, option3, option4].filter(
      (str) => str !== ""
    );

    //join two question dbs together
    const allQuestions = questions.concat(added);
    /* console.log(allQuestions); */

    //filter based on option 4
    const filteredByLastOption = allQuestions.filter((q) => {
      if (q.tags.includes(option4)) {
        return true;
      }
      return false;
    });
    /* console.log("filteredByLastOption: ", filteredByLastOption); */

    //filter based on option 1,2,3
    const fullyFiltered = filteredByLastOption.filter((q) => {
      if (option1 !== "") {
        if (q.tags.includes(option1)) {
          return true;
        }
        return false;
      } else if (option2 !== "") {
        if (q.tags.includes(option2)) {
          return true;
        }
        return false;
      } else if (option3 !== "") {
        if (q.tags.includes(option3)) {
          return true;
        }
        return false;
      }
      return true;
    });
    /* console.log("fully filteres: ", fullyFiltered); */

    //shuffle
    const shuffledQuestions = fullyFiltered
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    /* console.log("shuffled: ", shuffledQuestions); */

    //limit
    const finalQuestions = shuffledQuestions.slice(0, limit);
    /* console.log(finalQuestions); */

    //go to next page and save state
    navigate("/new-game/play", {
      state: {
        questions: finalQuestions,
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
    console.log(e.target);
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
        <span className="players-title">I am playing with:</span>
        <div className="players">
          <input
            ref={newPlayerInput}
            type="text"
            onChange={(e) => setNewPlayer(e.target.value)}
            value={newPlayer}
            id="playerInput"
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
        {error && <p className="error">{error}</p>}
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

      <div className="slider">
        <p className="mt-38">
          Number of questions:{" "}
          <span
            style={{ color: "var(--orange)", fontFamily: "Quicksand_Bold" }}
          >
            {limit}
          </span>
        </p>
        <ReactSlider
          className="customSlider"
          trackClassName="customSlider-track"
          thumbClassName="customSlider-thumb"
          markClassName="customSlider-mark"
          marks={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
          min={5}
          max={15}
          value={limit}
          onChange={(value) => setLimit(value)}
          renderMark={(props) => {
            if (props.key < limit) {
              props.className = "customSlider-mark customSlider-mark-before";
            } else if (props.key === limit) {
              props.className = "customSlider-mark customSlider-mark-active";
            }
            return <span {...props} />;
          }}
        />
      </div>
      <button className="btn mt-38 full-width" onClick={playGame}>
        Start new game
      </button>
      {dataError && <p className="error">{dataError}</p>}
    </motion.div>
  );
}
