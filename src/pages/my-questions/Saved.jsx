import React from "react";
import "./Saved.css";
import check from "../../assets/checkWhite.svg";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useStyles } from "../../hooks/useStyles";
import { AnimatePresence, motion } from "framer-motion";
import ItemList from "../../components/ItemList";

export default function Saved() {
  const { pickCardColor } = useStyles();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/saved`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/saved`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="saved-questions"
    >
      <div className="heading text-center">
        <h3 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
          Saved for later
        </h3>
      </div>
      <ItemList
        documents={documents}
        isPending={isPending}
        error={error}
        noDocsMessage={"No saved questions"}
      >
        <AnimatePresence mode={"popLayout"}>
          {documents?.map((q) => (
            <motion.div
              layout
              animate={{ opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
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
            </motion.div>
          ))}
        </AnimatePresence>
      </ItemList>
    </motion.div>
  );
}
