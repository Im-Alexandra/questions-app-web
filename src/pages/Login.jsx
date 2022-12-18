import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import "./Login.css";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();
  const { forgotPassword } = useForgotPassword();
  const { googleLogin } = useGoogleLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    googleLogin();
  };

  const handleForgotPassword = () => {
    console.log(email);
    /*     if (email)
      sendPasswordResetEmail(auth, email).then(() => {
        console.log("email success");
        setEmail("");
      }); */
    forgotPassword(email)
      .then(() => {
        setEmail("");
      })
      .catch((err) => console.log(err.message));
    //TODO: improve the error from this and the feedback to the user
  };

  return (
    <form className="login-form">
      <h2>Login</h2>

      <label>
        <span>Email: </span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          autoComplete="email"
        ></input>
      </label>
      <label>
        <span>Password: </span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          autoComplete="current-password"
        ></input>
      </label>
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {!isPending && (
        <button onClick={handleSubmit} className="btn">
          Login
        </button>
      )}
      {error && <p className="error">{error}</p>}
      <p onClick={handleForgotPassword}>Forgot password?</p>
      <button onClick={handleGoogleLogin}>Google</button>
      <p style={{ marginTop: "100px" }}>
        Don´t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
