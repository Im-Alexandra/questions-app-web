import { useReducer } from "react";
import { db, storage } from "../firebase/config";
import { doc, setDoc, collection, deleteDoc, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

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
  const addDocument = async (col, newDoc) => {
    dispatch({ type: "IS_PENDING" });
    //collection ref e.g. (db, "users", user.id)
    const ref = collection(db, col);
    
    try {
      const addedDoc = await addDoc(ref, {...newDoc});
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

  //upload profile picture and update the user with its url
  const uploadProfilePhoto = async (file, user) => {
    dispatch({ type: "IS_PENDING" });
    const uploadPath = `images/${user.uid}/${file.name}`;
    const fileRef = ref(storage, uploadPath);
    let downloadURL;
    try {
      await uploadBytes(fileRef, file);
      await getDownloadURL(fileRef).then((url) => {
        downloadURL = url;
      });
      //update user profile with the uploaded picture
      updateProfile(user, { photoURL: downloadURL }).catch((error) =>
        console.log(error)
      );

      dispatch({
        type: "ADDED_DOCUMENT",
        payload: downloadURL,
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
    uploadProfilePhoto,
    response,
  };
};
