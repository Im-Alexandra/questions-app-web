import React, { useState } from "react";
import "./Add.css";
import CategoryPicker from "../../components/CategoryPicker";

export default function Add() {
  const [newQuestion, setNewQuestion] = useState("");

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

  const handleKeyUp = (e) => {
    const current = e.target.value.length;
    const currentText = document.getElementById("currentCount");
    currentText.innerHTML = current;
  };

  const handleAddQuestion = () => {
    const tags = [option1, option2, option3, option4].filter(
      (str) => str !== ""
    );
    const questionToAdd = {
      question: newQuestion,
      tags: tags,
    };
    console.log(questionToAdd);
  };

  return (
    <div className="add">
      <div className="heading text-center">
        <h3>Add a new question</h3>
      </div>
      <div className="textarea-wrapper">
        <textarea
          placeholder="Write a new question..."
          maxLength="150"
          onKeyUp={handleKeyUp}
          onChange={(e) => {
            setNewQuestion(e.target.value);
          }}
          value={newQuestion}
        ></textarea>
        <div className="count">
          <span id="currentCount">0</span>
          <span>/ 150</span>
        </div>
      </div>

      <CategoryPicker
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}
        change={handleCategoryChange}
      />
      <div className="btn-wrapper">
        <button className="btn" onClick={handleAddQuestion}>
          Add question
        </button>
      </div>
    </div>
  );
}