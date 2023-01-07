import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  //realtime data for document
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument({ ...docSnap.data(), id: docSnap.id });
          setError(null);
        } else {
          setDocument(undefined);
          setError("No such question exists");
        }
      } catch (err) {
        setError(err.message);
      }
      setIsPending(false);
    };

    fetchData();
  }, [collection, id]);

  return { document, isPending, error };
};
