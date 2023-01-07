import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Question.css";
import { useDocument } from "../hooks/useDocument";
import close from "../assets/closeWhite.svg";
import heart from "../assets/heart.svg";
import leftArrow from "../assets/leftArrowWhite.svg";
import time from "../assets/time.svg";

export default function Question() {
  const { id } = useParams();
  const { document, isPending, error } = useDocument("questions", id);
  const navigate = useNavigate();

  return (
    <div className="question-container">
      <div className="question-page">
        <img
          className="icon"
          src={close}
          alt="close icon"
          onClick={() => {
            navigate("/play");
          }}
        />
        {isPending && <p>Loading</p>}
        {document && <p>{document.question}</p>}
        {error && <p className="error">{error}</p>}
        {console.log(document)}
        <div className="controls">
          <div className="top">
            <img className="controls-icon" src={heart} alt="" />
          </div>
          <div className="mid">
            <img className="controls-icon" src={leftArrow} alt="" />
            <p>5/10</p>
            <img className="controls-icon" src={leftArrow} alt="" />
          </div>
          <div className="bot">
            <img className="controls-icon" src={time} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
