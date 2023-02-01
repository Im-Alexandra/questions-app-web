import React, { useEffect, useState } from "react";
import "./Add.css";
import CategoryPicker from "../../components/CategoryPicker";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { motion } from "framer-motion";

export default function Add() {
  const [newQuestion, setNewQuestion] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { addDocToSubcollectionNewId, response } = useFirestore("users");
  const [btnState, setBtnState] = useState("idle");
  const [dbError, setDbError] = useState(null);

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
    setError(null);
    const current = e.target.value.length;
    const currentText = document.getElementById("currentCount");
    currentText.innerHTML = current;
  };

  const handleAddQuestion = () => {
    setBtnState("loading");
    if (error) {
      document.getElementById("question").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      return;
    }
    setError(null);
    setDbError(null);
    const tags = [option1, option2, option3, option4].filter(
      (str) => str !== ""
    );
    const questionToAdd = {
      question: newQuestion,
      tags: tags,
    };
    if (newQuestion !== "") {
      addDocToSubcollectionNewId(user.uid, "added", questionToAdd);
      const currentText = document.getElementById("currentCount");
      currentText.innerHTML = "0";
    } else {
      setError("Question has to be filled");
    }
  };

  /* error and success for adding the question to DB */
  useEffect(() => {
    if (response.success) {
      setNewQuestion("");
      setBtnState("success");
      document.getElementById("question").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      let timer = setTimeout(() => setBtnState("idle"), 2000);
      return () => {
        clearTimeout(timer);
      };
    } else if (response.error) {
      setBtnState("idle");
      setDbError(response.error);
    }
  }, [response.success, response.error]);

  /* error for the text area */
  useEffect(() => {
    if (error !== null) {
      document.getElementById("question").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="add"
    >
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
          id="question"
        ></textarea>
        <div className="count">
          <span id="currentCount">0</span>
          <span>/ 150</span>
        </div>
        {error && <p className="error text-center">{error}</p>}
      </div>

      <CategoryPicker
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}
        change={handleCategoryChange}
      />

      <div className="new-section">
        {/*         <ReactiveButton
          initialText="Add question"
          btnState={btnState}
          onClickFunction={handleAddQuestion}
          successText="Added"
        /> */}
        <button
          className="btn"
          onClick={handleAddQuestion}
          disabled={btnState === "loading" ? "disabled" : ""}
        >
          Add question
        </button>
        {dbError && <p className="error text-center">{dbError}</p>}
      </div>
    </motion.div>
  );
}
