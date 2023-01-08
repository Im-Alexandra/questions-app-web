import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Question.css";
import close from "../assets/closeWhite.svg";
import heart from "../assets/heart.svg";
import leftArrow from "../assets/leftArrowWhite.svg";
import time from "../assets/time.svg";

export default function Question() {
  const navigate = useNavigate();
  //this is disgusting and you know it
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(location.state.currentIndex);

  const click = () => {
    console.log("DISGUSTING STATE: ", location.state.pickedReshuffledQuestions);
    console.log(location.state.pickedReshuffledQuestions.length);
  };

  const handleArrowClick = (e) => {
    if (e.target.alt === "left" && currentIndex === 0) {
      //console.log("This is the first question, go back to new game page");
      navigate("/new-game");
    } else if (e.target.alt === "left" && currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      e.target.alt === "right" &&
      currentIndex + 1 === location.state.pickedReshuffledQuestions.length
    ) {
      //console.log("This is the last question, go to save the game page");
      navigate("/new-game/save", {
        state: {
          pickedReshuffledQuestions: location.state.pickedReshuffledQuestions,
          players: location.state.players,
        },
      });
    } else if (
      e.target.alt === "right" &&
      currentIndex + 1 !== location.state.pickedReshuffledQuestions.length
    ) {
      setCurrentIndex(currentIndex + 1);
    }
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
        {location.state.pickedReshuffledQuestions.length !== 0 && (
          <>
            <p className="question">
              {location.state.pickedReshuffledQuestions[currentIndex].question}
            </p>

            <div className="controls">
              <div className="top">
                <img
                  className="controls-icon"
                  src={heart}
                  alt=""
                  onClick={click}
                />
              </div>

              <div className="mid">
                <img
                  className="controls-icon"
                  src={leftArrow}
                  alt="left"
                  onClick={handleArrowClick}
                />
                {location.state.pickedReshuffledQuestions && (
                  <p>
                    {currentIndex + 1}/
                    {location.state.pickedReshuffledQuestions.length}
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
                <img className="controls-icon" src={time} alt="" />
              </div>
            </div>
          </>
        )}
        {location.state.pickedReshuffledQuestions.length === 0 && (
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
