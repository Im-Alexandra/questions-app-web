import React from "react";
import "./AddedQuestions.css";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useStyles } from "../../hooks/useStyles";
import { useFirestore } from "../../hooks/useFirestore";
import Masonry from "react-masonry-css";

import arrow from "../../assets/leftArrowOrange.svg";
import trash from "../../assets/trash.svg";

export default function AddedQuestions() {
  const { pickCardColor } = useStyles();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/added`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/added`);
  const masonryBreakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
    <div className="container added-questions">
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        Added questions
      </h2>
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
              <p className="subheadline">Category:</p>
              <ul className="tags">
                {q.tags !== undefined &&
                  q.tags.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="icon-wrapper">
                <div>
                  <img
                    src={trash}
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
