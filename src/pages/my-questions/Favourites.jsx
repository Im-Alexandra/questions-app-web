import React from "react";
import "./Favourites.css";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useStyles } from "../../hooks/useStyles";
import Masonry from "react-masonry-css";

import trash from "../../assets/trash.svg";

export default function Favourites() {
  const { pickCardColor } = useStyles();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/favourites`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/favourites`);
  const masonryBreakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
    <div className="favourites">
      <div className="heading text-center">
        <h3>Favourites</h3>
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
              <div className="icon-wrapper">
                <div>
                  <img
                    src={trash}
                    alt="check icon"
                    onClick={(e) => deleteDocument(q.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </Masonry>
        {documents && documents.length === 0 && <p>No favourite questions</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
