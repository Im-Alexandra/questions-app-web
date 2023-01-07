import React, { useRef, useState } from "react";
import "./NewGame.css";
import { useNavigate } from "react-router-dom";

import arrow from "../assets/leftArrowOrange.svg";
import deleteIcon from "../assets/closeBlack.svg";
import infoIcon from "../assets/infoIcon.svg";
import InfoModal from "../components/InfoModal";

export default function NewGame() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newPlayer, setNewPlayer] = useState("");
  const [players, setPlayers] = useState([]);
  const newPlayerInput = useRef(null);

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("fun");

  const fakeDb = [
    {
      id: "080nLRzpzdGBpL2UlnIi",
      question:
        "How do you tell your story? Always the same...or is there a lot of variations on your story?",
      tags: ["justMet", "connection"],
    },
    {
      id: "4AgLKQYluPFisFYOC8bk",
      question: "Are you afraid of sexual activities on the edge?",
      tags: ["romantic", "fun"],
    },
    {
      id: "85yz7xyGKkBRbjiPoPw9",
      question:
        "How would you look and behave if you were a Professor of Happiness?",
      tags: ["romantic", "fun"],
    },
    {
      id: "97WYy0CtMYnmiDHWjBIf",
      question: "Do we have the power of changing other people?",
      tags: ["justMet", "famFriendly", "connection"],
    },
  ];

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
    console.log("players: ", players);
    let catArray = [option1, option2, option3, option4].filter(
      (str) => str !== ""
    );
    console.log("categories: ", catArray);

    //get back all the eligible questions and reshuffle them
    const reshuffledQuestions = fakeDb
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    //pick first 2
    const pickedReshuffledQuestions = reshuffledQuestions.slice(0, 3);

    console.log("from db: ", fakeDb);
    console.log("shuffled db: ", pickedReshuffledQuestions);

    navigate("/new-game/play", {
      state: { pickedReshuffledQuestions, players, currentIndex: 0 },
    });
  };

  return (
    <div className="container new-game">
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
      {players.length === 4 && <p className="error">Maximum players reached</p>}
      <div className="current-players">
        {players.length !== 0 && <p>Current players:</p>}
        {players.map((p, i) => (
          <p key={p}>
            {i + 1}. {p}
            <img
              src={deleteIcon}
              alt="remove player"
              onClick={() => handlePlayerDelete(p)}
            />
          </p>
        ))}
      </div>

      {/* CATEGORIES BELOW */}
      <p className="mt-38">Romantic or sexual partner:</p>
      <div className="options-container">
        <label className={option1 === "romantic" ? "checked" : ""}>
          <span>YES</span>
          <input
            type="radio"
            value="romantic"
            name="option1"
            checked={option1 === "romantic"}
            onChange={(e) => {
              setOption1(e.target.value);
            }}
          ></input>
        </label>
        <label className={option1 === "" ? "checked" : ""}>
          <span>NO</span>
          <input
            type="radio"
            value=""
            name="option1"
            checked={option1 === ""}
            onChange={(e) => {
              setOption1(e.target.value);
            }}
          ></input>
        </label>
      </div>

      <p className="mt-38 p-with-icon">
        Keep it family-friendly:
        <img
          className="icon"
          src={infoIcon}
          alt="family friendly"
          onClick={() => setShowModal(true)}
        />
      </p>
      <div className="options-container">
        <label className={option2 === "famFriendly" ? "checked" : ""}>
          <span>YES</span>
          <input
            type="radio"
            value="famFriendly"
            name="option2"
            checked={option2 === "famFriendly"}
            onChange={(e) => {
              setOption2(e.target.value);
            }}
          ></input>
        </label>
        <label className={option2 === "" ? "checked" : ""}>
          <span>NO</span>
          <input
            type="radio"
            value=""
            name="option2"
            checked={option2 === ""}
            onChange={(e) => {
              setOption2(e.target.value);
            }}
          ></input>
        </label>
      </div>

      <p className="mt-38">Just met:</p>
      <div className="options-container">
        <label className={option3 === "justMet" ? "checked" : ""}>
          <span>YES</span>
          <input
            type="radio"
            value="justMet"
            name="option3"
            checked={option3 === "justMet"}
            onChange={(e) => {
              setOption3(e.target.value);
            }}
          ></input>
        </label>
        <label className={option3 === "" ? "checked" : ""}>
          <span>NO</span>
          <input
            type="radio"
            value=""
            name="option3"
            checked={option3 === ""}
            onChange={(e) => {
              setOption3(e.target.value);
            }}
          ></input>
        </label>
      </div>

      <p className="mt-38">Specify nature of the game:</p>
      <div className="options-container">
        <label className={option4 === "fun" ? "checked" : ""}>
          <span>FUN</span>
          <input
            type="radio"
            value="fun"
            name="option4"
            checked={option4 === "fun"}
            onChange={(e) => {
              setOption4(e.target.value);
            }}
          ></input>
        </label>
        <label className={option4 === "connection" ? "checked" : ""}>
          <input
            type="radio"
            value="connection"
            name="option4"
            checked={option4 === "connection"}
            onChange={(e) => {
              setOption4(e.target.value);
            }}
          ></input>
          <span>CONNECTION</span>
        </label>
      </div>
      <button className="btn mt-38 full-width" onClick={playGame}>
        Start new game
      </button>

      {showModal && (
        <InfoModal
          handleClose={() => {
            setShowModal(false);
          }}
        >
          <h2>Modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            gravida pellentesque est. Vestibulum blandit metus non mauris
            fermentum, nec lobortis dui pulvinar. Quisque pulvinar ipsum arcu,
            ut varius ipsum laoreet eu.
          </p>
        </InfoModal>
      )}
    </div>
  );
}
