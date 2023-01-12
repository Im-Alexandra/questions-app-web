import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SaveGame.css";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";

import close from "../assets/closeWhite.svg";
import arrowLeft from "../assets/leftArrowWhite.svg";
import trash from "../assets/trash.svg";
import InfoModal from "../components/InfoModal";

export default function SaveGame() {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const { addDocToSubcollectionNewId, response } = useFirestore("users");

  const handleKeyUp = (e) => {
    const current = e.target.value.length;
    const currentText = document.getElementById("current");
    currentText.innerHTML = current;
  };

  const handleLeftArrowClick = () => {
    navigate(-1);
  };

  const saveGame = () => {
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
    console.log(game);
    console.log(user.uid);
    addDocToSubcollectionNewId(user.uid, "games", game);
  };

  //fires when success from response changes
  useEffect(() => {
    if (response.success) {
      //TODO: add animation to show success
      console.log("success");
      navigate("/home");
    }
  }, [response.success, navigate]);

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
