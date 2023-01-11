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

  const handleResolved = (e, id) => {
    console.log(id);
  };

  return (
    <div className="saved-questions">
      <div className="heading text-center">
        <h3>Saved for later</h3>
      </div>
      <div className="content">
        {props.questions !== undefined &&
          Object.keys(props.questions).map((q) => (
            <div
              className="card"
              key={q}
              style={{
                backgroundColor: pickCardColor(props.questions[q].tags),
              }}
            >
              <p>{props.questions[q].question}</p>
              <div className="players">
                {q.players !== undefined &&
                  props.questions[q].players.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="icon-wrapper">
                <div>
                  <img
                    src={check}
                    alt="check icon"
                    onClick={(e) => handleResolved(e, q)}
                  />
                </div>
              </div>
            </div>
          ))}
        {props.questions === undefined && <p>No saved questions</p>}
      </div>
    </div>
  );
}
