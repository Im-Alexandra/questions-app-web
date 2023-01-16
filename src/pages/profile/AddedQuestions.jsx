import React from "react";
import "./AddedQuestions.css";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useStyles } from "../../hooks/useStyles";
import { useFirestore } from "../../hooks/useFirestore";
import { AnimatePresence, motion } from "framer-motion";

import arrow from "../../assets/leftArrowOrange.svg";
import trash from "../../assets/trash.svg";
import ItemList from "../../components/ItemList";

export default function AddedQuestions() {
  const { pickCardColor } = useStyles();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/added`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/added`);

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
      <ItemList
        documents={documents}
        isPending={isPending}
        error={error}
        noDocsMessage={"No added questions"}
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
            </motion.div>
          ))}
        </AnimatePresence>
      </ItemList>
    </div>
  );
}
