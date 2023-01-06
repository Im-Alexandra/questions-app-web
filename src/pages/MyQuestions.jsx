import React from "react";
import "./MyQuestions.css";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/leftArrowOrange.svg";

export default function MyQuestions() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        QUESTIONS
      </h2>
    </div>
  );
}
