import React from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AnimatePresence, motion } from "framer-motion";
import ItemList from "../../components/ItemList";

import "./MyGames.css";
import arrow from "../../assets/leftArrowOrange.svg";

export default function MyGames() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/games`
  );

  return (
    <div className="container game-records">
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        Game records
      </h2>
      <ItemList
        documents={documents}
        isPending={isPending}
        error={error}
        noDocsMessage={"No game records"}
      >
        <AnimatePresence mode={"popLayout"}>
          {documents?.map((q) => (
            <>
              <motion.div
                layout
                animate={{ opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
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
                <p className="date text-center">{q.date}</p>
              </motion.div>
            </>
          ))}
        </AnimatePresence>
      </ItemList>
    </div>
  );
}
