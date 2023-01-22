import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const useCollection = (col, _q, _l) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const q = useRef(_q).current;
  const l = useRef(_l).current;
  //const q = query(collection(db, "questions"), where("capital", "==", true));

  //realtime data for the collection
  useEffect(() => {
    let ref = collection(db, col);

    if (q) {
      ref = query(ref, where(...q));
    }
    if (l) {
      ref = query(ref, limit(l));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Couldnt fetch the data");
      }
    );

    return () => unsub();
  }, [col, q, l]);

  return { documents, error };
};
