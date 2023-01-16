import React from "react";
import "./Favourites.css";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useStyles } from "../../hooks/useStyles";
import { AnimatePresence, motion } from "framer-motion";

import trash from "../../assets/trash.svg";
import ItemList from "../../components/ItemList";

export default function Favourites() {
  const { pickCardColor } = useStyles();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/favourites`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/favourites`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="favourites"
    >
      <div className="heading text-center">
        <h3>Favourites</h3>
      </div>
      <ItemList
        documents={documents}
        isPending={isPending}
        error={error}
        noDocsMessage={"No favourite questions"}
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
              <div className="icon-wrapper">
                <div>
                  <img
                    src={trash}
                    alt="check icon"
                    onClick={(e) => deleteDocument(q.id)}
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
