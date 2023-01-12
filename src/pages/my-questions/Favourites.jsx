import React from "react";
import "./Favourites.css";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

import trash from "../../assets/trash.svg";

export default function Favourites() {
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/favourites`
  );

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

  const handleClick = (e, id) => {
    const questionToDelete = id;
    console.log(questionToDelete);
  };

  return (
    <div className="favourites">
      <div className="heading text-center">
        <h3>Favourites</h3>
      </div>
      <div className="content">
        {isPending && <p>Loading...</p>}
        {documents?.map((q) => (
          <div
            className="card"
            key={q.id}
            style={{
              backgroundColor: pickCardColor(q.tags),
            }}
          >
            <p>{q.question}</p>
            <div className="icon-wrapper">
              <div>
                <img
                  src={trash}
                  alt="check icon"
                  onClick={(e) => handleClick(e, q)}
                />
              </div>
            </div>
          </div>
        ))}
        {documents === undefined && <p>No favourite questions</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
