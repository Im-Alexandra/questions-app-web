import React from "react";
import "./ReactiveButton.css";

//import checkIcon from "../assets/checkWhite.svg";

export default function ReactiveButton({
  initialText,
  btnState,
  successText = "S",
  onClickFunction,
}) {
  return (
    <div className="reactive-btn">
      <button
        className="btn"
        onClick={onClickFunction}
        disabled={btnState === "success" ? true : false}
      >
        {btnState === "idle" && initialText}
        {btnState === "success" && successText}
      </button>
    </div>
  );
}
