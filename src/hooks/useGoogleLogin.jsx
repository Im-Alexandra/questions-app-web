import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const useGoogleLogin = () => {
  const { dispatch } = useAuthContext();

  const googleLogin = async () => {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());

    if (!res) {
      throw new Error("Could not complete google login");
    }

    dispatch({ type: "LOGIN", payload: res.user });
  };

  return { googleLogin };
};
