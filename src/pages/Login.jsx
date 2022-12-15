import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
        ></input>
      </label>

      <button onClick={handleSubmit} className="btn">
        Login
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
