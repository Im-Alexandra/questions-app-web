import React, { useEffect } from "react";
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

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export default function AddedQuestions() {
  const { pickCardColor } = useStyles();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection(
    `users/${user.uid}/added`
  );
  const { deleteDocument } = useFirestore(`users/${user.uid}/added`);
  /* const [correctedDocs, setCorrectedDocs] = useState([]); */

  useEffect(() => {
    if (documents !== undefined) {
      //TODO: fix this
      /* const newTags = documents?.map((d) => d.tags.map((t) => translateTag(t)));
      console.log(newTags);
      setCorrectedDocs(documents);
      correctedDocs?.forEach((d, i) => (d.tags = newTags[i]));
    console.log("corrected docs: ", correctedDocs); */
    }
  }, [documents]);

  /* const translateTag = (tag) => {
    const capitalizedString = tag.replace(/(?:^|\s|[-"'([{])+\S/g, (c) =>
      c.toUpperCase()
    );
    const stringWithSpaces = capitalizedString
      .replace(/([A-Z])/g, " $1")
      .trim();
    return stringWithSpaces;
  }; */

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container added-questions"
    >
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
    </motion.div>
  );
}
