import React, { useState } from "react";
import "./MyQuestions.css";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/leftArrowOrange.svg";
import CategoryPicker from "../components/CategoryPicker";

export default function MyQuestions() {
  const navigate = useNavigate();

  //category picker state
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("fun");

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
      <CategoryPicker
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}
        change={handleCategoryChange}
      />
    </div>
  );
}
