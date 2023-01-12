import { useReducer } from "react";
import { db } from "../firebase/config";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";

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
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
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

export const useFirestore = (col) => {
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
    dispatch({ type: "IS_PENDING" });
    //collection ref e.g. (db, "users", user.id, "saved", savedQuestionId)
    const ref = doc(db, col, docInMainCol, subColName, idOfNewDoc);
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

  //add doc to subcollection and generate new id for it
  const addDocToSubcollectionNewId = async (
    docInMainCol,
    subColName,
    newDoc
  ) => {
    dispatch({ type: "IS_PENDING" });
    const ref = doc(collection(db, col, docInMainCol, subColName));
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
    dispatch({ type: "IS_PENDING" });
    //collection ref e.g. (db, "users", user.id)
    const ref = doc(db, col);
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
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, col, id));
      dispatch({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  return {
    addDocument,
    addDocToSubcollection,
    addDocToSubcollectionNewId,
    deleteDocument,
    response,
  };
};
