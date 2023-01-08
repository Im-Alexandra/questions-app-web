import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SaveGame.css";
import close from "../assets/closeWhite.svg";
import arrowLeft from "../assets/leftArrowWhite.svg";
import trash from "../assets/trash.svg";
import InfoModal from "../components/InfoModal";

export default function SaveGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");

  const handleKeyUp = (e) => {
    const current = e.target.value.length;
    const currentText = document.getElementById("current");
    currentText.innerHTML = current;
  };

  const handleLeftArrowClick = () => {
    /* console.log(location.state.pickedReshuffledQuestions);
    console.log(location.state.players);
    const questions = location.state.pickedReshuffledQuestions;
    const players = location.state.players; */
    navigate(-1);
  };

  const saveGame = () => {
    //save the questions
    console.log(
      "Session questions: ",
      location.state.pickedReshuffledQuestions
    );
    //save the players
    console.log("Session players: ", location.state.players);
    //save the date
    const date = new Date().toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    console.log("Session date: ", date);
    //save the note
    console.log("Session note: ", note);
  };

  return (
    <div className="save-game-container">
      <div className="save-game-page">
        <img
          className="icon"
          src={close}
          alt="close icon"
          onClick={() => {
            setShowModal(true);
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
        <div className="players">
          {location.state.players &&
            location.state.players.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="controls">
          <img src={arrowLeft} alt="left" onClick={handleLeftArrowClick} />
          <img
            src={trash}
            alt="delete"
            onClick={() => {
              setShowModal(true);
            }}
          />
          <img src={arrowLeft} alt="right" onClick={saveGame} />
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
    </div>
  );
}
