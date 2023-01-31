import React, { useState } from "react";
import "./CategoryPicker.css";
import infoIcon from "../assets/infoIcon.svg";
import InfoModal from "../components/InfoModal";

import { AnimatePresence } from "framer-motion";

export default function CategoryPicker(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="cat-picker">
      <h3 className="text-center new-section">Pick categories</h3>
      <p style={{ marginTop: "26px" }}>Romantic or sexual partner:</p>
      <div className="options-container">
        <label className={props.option1 === "romantic" ? "checked" : ""}>
          <span>YES</span>
          <input
            type="radio"
            value="romantic"
            name="option1"
            checked={props.option1 === "romantic"}
            onChange={props.change}
          ></input>
        </label>
        <label className={props.option1 === "" ? "checked" : ""}>
          <span>NO</span>
          <input
            type="radio"
            value=""
            name="option1"
            checked={props.option1 === ""}
            onChange={props.change}
          ></input>
        </label>
      </div>

      <p className="mt-38 p-with-icon">
        Keep it family-friendly:
        <img
          className="icon"
          src={infoIcon}
          alt="family friendly"
          onClick={() => setShowModal(true)}
        />
      </p>
      <div className="options-container">
        <label className={props.option2 === "famFriendly" ? "checked" : ""}>
          <span>YES</span>
          <input
            type="radio"
            value="famFriendly"
            name="option2"
            checked={props.option2 === "famFriendly"}
            onChange={props.change}
          ></input>
        </label>
        <label className={props.option2 === "" ? "checked" : ""}>
          <span>NO</span>
          <input
            type="radio"
            value=""
            name="option2"
            checked={props.option2 === ""}
            onChange={props.change}
          ></input>
        </label>
      </div>

      <p className="mt-38">Just met:</p>
      <div className="options-container">
        <label className={props.option3 === "justMet" ? "checked" : ""}>
          <span>YES</span>
          <input
            type="radio"
            value="justMet"
            name="option3"
            checked={props.option3 === "justMet"}
            onChange={props.change}
          ></input>
        </label>
        <label className={props.option3 === "" ? "checked" : ""}>
          <span>NO</span>
          <input
            type="radio"
            value=""
            name="option3"
            checked={props.option3 === ""}
            onChange={props.change}
          ></input>
        </label>
      </div>

      <p className="mt-38">Specify nature of the game:</p>
      <div className="options-container">
        <label className={props.option4 === "fun" ? "checked" : ""}>
          <span>FUN</span>
          <input
            type="radio"
            value="fun"
            name="option4"
            checked={props.option4 === "fun"}
            onChange={props.change}
          ></input>
        </label>
        <label className={props.option4 === "connection" ? "checked" : ""}>
          <input
            type="radio"
            value="connection"
            name="option4"
            checked={props.option4 === "connection"}
            onChange={props.change}
          ></input>
          <span>CONNECTION</span>
        </label>
      </div>

      <AnimatePresence mode="wait">
        {showModal && (
          <InfoModal
            handleClose={() => {
              setShowModal(false);
            }}
          >
            <h2>Family friendly</h2>
            <p>
              Family friendly questions are questions devoid of material which
              is deemed innappropriate for children, such as sexually explicit
              questions.
            </p>
          </InfoModal>
        )}
      </AnimatePresence>
    </div>
  );
}
