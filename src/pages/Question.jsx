import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Question.css";
import close from "../assets/closeWhite.svg";
import heart from "../assets/heartWhite.svg";
import leftArrow from "../assets/leftArrowWhite.svg";
import time from "../assets/timeWhite.svg";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Question() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { addDocToSubcollection, response } = useFirestore("users");
  //using this to know which subcollection was just updated
  const [subcol, setSubCol] = useState("");
  //weird state alert
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(location.state.currentIndex);

  //fires when success from response changes
  useEffect(() => {
    if (response.success) {
      //TODO: add animation to show success
      console.log("added to ", subcol);
    }
  }, [response.success, subcol]);

  const saveToFavourites = () => {
    let questionId = location.state.questions[currentIndex].id;
    let questionContent = {
      question: location.state.questions[currentIndex].question,
      tags: location.state.questions[location.state.currentIndex].tags,
    };
    addDocToSubcollection(user.uid, "favourites", questionId, questionContent);
    setSubCol("favourites");
  };

  const handleArrowClick = (e) => {
    if (e.target.alt === "left" && currentIndex === 0) {
      //console.log("This is the first question, go back to new game page");
      navigate("/new-game");
    } else if (e.target.alt === "left" && currentIndex !== 0) {
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
    setSubCol("saved");
  };

  return (
    <div className="question-container">
      <div className="question-page">
        <img
          className="icon"
          src={close}
          alt="close icon"
          onClick={() => {
            navigate("/new-game");
          }}
        />
        {location.state.questions.length !== 0 && (
          <>
            <p className="question">
              {location.state.questions[currentIndex].question}
            </p>
            {response.error && <p className="error">{response.error}</p>}

            <div className="controls">
              <div className="top">
                <img
                  className="controls-icon"
                  src={heart}
                  alt=""
                  onClick={saveToFavourites}
                />
              </div>

              <div className="mid">
                <img
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
                <img
                  className="controls-icon"
                  src={leftArrow}
                  alt="right"
                  onClick={handleArrowClick}
                />
              </div>

              <div className="bot">
                <img
                  className="controls-icon"
                  src={time}
                  alt=""
                  onClick={saveToSaved}
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
      </div>
    </div>
  );
}
