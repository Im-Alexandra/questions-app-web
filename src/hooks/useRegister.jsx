import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (displayName, email, password) => {
    setError(null);
    setIsPending(true);

    console.log(isCancelled);

    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!user) {
        throw new Error("Could not complete signup");
      }

      //add display name
      await updateProfile(user, { displayName });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, register };
};
