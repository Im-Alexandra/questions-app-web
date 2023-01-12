import { useReducer } from "react";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  //response is state that represents the response from firestore
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  //TODO: figure out how to add a cleanup function

  //add doc to subcollection
  const addDocToSubcollection = async (
    docInMainCol,
    subColName,
    idOfNewDoc,
    newDoc
  ) => {
    //collection ref e.g. (db, "users", user.id, "saved", savedQuestionId)
    const ref = doc(db, collection, docInMainCol, subColName, idOfNewDoc);

    dispatch({ type: "IS_PENDING" });

    try {
      const addedDoc = await setDoc(ref, { ...newDoc });
      dispatch({
        type: "ADDED_DOCUMENT",
        payload: addedDoc,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  //add document
  const addDocument = async (doc) => {
    //collection ref e.g. (db, "users", user.id)
    const ref = doc(db, collection);

    dispatch({ type: "IS_PENDING" });

    try {
      const addedDoc = await setDoc(ref, doc);
      dispatch({
        type: "ADDED_DOCUMENT",
        payload: addedDoc,
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  //delete document
  const deleteDocument = async (id) => {};

  return { addDocument, addDocToSubcollection, deleteDocument, response };
};
