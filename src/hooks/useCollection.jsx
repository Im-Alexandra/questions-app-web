import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const useCollection = (col) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  //const q = query(collection(db, "questions"), where("capital", "==", true));

  //realtime data for the collection
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const querySnapshot = await getDocs(collection(db, col));
        let tempArray = [];
        querySnapshot.forEach((doc) => {
          tempArray.push({ ...doc.data(), id: doc.id });
        });
        if (querySnapshot.docs.length > 0) {
          setDocuments([...tempArray]);
          setError(null);
        } else {
          setDocuments(undefined);
          setError("No such collection exists");
        }
      } catch (err) {
        setError(err.message);
      }
      setIsPending(false);
    };

    fetchData();
  }, [col]);

  return { documents, error, isPending };
};
