import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

export const useForgotPassword = () => {
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return { forgotPassword };
};
