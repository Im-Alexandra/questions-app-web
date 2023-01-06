import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = db.collection(collection);
  }, [collection]);
};
