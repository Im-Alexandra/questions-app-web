import React from "react";
import "./Saved.css";
import check from "../../assets/checkWhite.svg";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useStyles } from "../../hooks/useStyles";
import Masonry from "react-masonry-css";

export default function Saved() {
  const { pickCardColor } = useStyles();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/saved`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/saved`);
  const masonryBreakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
    <div className="saved-questions">
      <div className="heading text-center">
        <h3>Saved for later</h3>
      </div>
      <div className="content">
        {isPending && <p>Loading...</p>}
        <Masonry
          breakpointCols={masonryBreakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
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
        </Masonry>
        {documents && documents.length === 0 && <p>No saved questions</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
