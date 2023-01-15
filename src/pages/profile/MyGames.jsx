import React from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import Masonry from "react-masonry-css";

import "./MyGames.css";
import arrow from "../../assets/leftArrowOrange.svg";

export default function MyGames() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/games`
  );
  const masonryBreakpoints = { default: 3, 700: 2 };

  return (
    <div className="container my-games">
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        Game records
      </h2>
      <div className="content">
        {isPending && <p>Loading...</p>}
        <Masonry
          breakpointCols={masonryBreakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {documents?.map((q) => (
            <>
              <div
                className="card"
                key={q.id}
                style={{
                  backgroundColor: "var(--orange)",
                }}
              >
                <div className="players">
                  {q.players !== undefined &&
                    q.players.map((p) => <p key={p}>{p}</p>)}
                </div>
                <p className="note">{q.note}</p>
              </div>
              <p className="date text-center">{q.date}</p>
            </>
          ))}
        </Masonry>
        {documents && documents.length === 0 && <p>No saved questions</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
