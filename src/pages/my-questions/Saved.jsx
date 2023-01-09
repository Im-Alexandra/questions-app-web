import React from "react";
import "./Saved.css";
import check from "../../assets/checkWhite.svg";

export default function Saved(props) {
  const pickCardColor = (tags) => {
    if (tags.includes("romantic")) {
      return "#e26c54";
    } else if (tags.includes("famFriendly")) {
      return "#2f5e63";
    } else if (tags.includes("justMet")) {
      return "#46bdc6";
    } else if (tags.includes("fun")) {
      return "#cabe55";
    } else {
      return "#46bdc6";
    }
  };

  return (
    <div className="saved-questions">
      <div className="heading text-center">
        <h3>Saved for later</h3>
      </div>
      <div className="content">
        {props.questions.length !== 0 &&
          props.questions.map((q) => (
            <div
              className="card"
              key={q.id}
              style={{ backgroundColor: pickCardColor(q.tags) }}
            >
              <p>{q.question}</p>
              <div className="players">
                {q.players !== undefined &&
                  q.players.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="icon-wrapper">
                <div>
                  <img src={check} alt="check icon" />
                </div>
              </div>
            </div>
          ))}
        {props.questions.length === 0 && <p>No saved questions</p>}
      </div>
    </div>
  );
}
