import React from "react";
import "./InfoModal.css";
import close from "../assets/closeBlack.svg";

export default function InfoModal({ children, handleClose }) {
  return (
    <div className="infoModal-backdrop">
      <div className="infoModal">
        <img src={close} alt="close icon" onClick={handleClose} />
        {children}
      </div>
    </div>
  );
}
