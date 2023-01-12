import React from "react";
import "./Saved.css";
import check from "../../assets/checkWhite.svg";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function Saved() {
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/saved`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/saved`);

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
            <div className="players">
              {q.players !== undefined &&
                q.players.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="icon-wrapper">
              <div>
                <img
                  src={check}
                  alt="check icon"
                  onClick={() => deleteDocument(q.id)}
                />
              </div>
            </div>
          </div>
        ))}
        {documents && documents.length === 0 && <p>No saved questions</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
