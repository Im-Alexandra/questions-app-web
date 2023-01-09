import React from "react";
import "./Favourites.css";

import trash from "../../assets/trash.svg";

export default function Favourites(props) {
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

  const handleClick = (e, index) => {
    const indexToDelete = index;
    console.log(indexToDelete);
  };

  return (
    <div className="favourites">
      <div className="heading text-center">
        <h3>Favourites</h3>
      </div>
      <div className="content">
        {props.questions.length !== 0 &&
          props.questions.map((q, i) => (
            <div
              className="card"
              key={q.id}
              style={{ backgroundColor: pickCardColor(q.tags) }}
            >
              <p>{q.question}</p>
              <div className="icon-wrapper">
                <div>
                  <img
                    src={trash}
                    alt="check icon"
                    onClick={(e) => handleClick(e, i)}
                  />
                </div>
              </div>
            </div>
          ))}
        {props.questions.length === 0 && <p>No favourite questions</p>}
      </div>
    </div>
  );
}
