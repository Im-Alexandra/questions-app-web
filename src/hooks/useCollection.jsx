import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (col) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  //const q = query(collection(db, "questions"), where("capital", "==", true));

  //realtime data for the collection
  useEffect(() => {
    let ref = collection(db, col);
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
  }, [col]);

  return { documents, error };
};
