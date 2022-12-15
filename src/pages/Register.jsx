import React from "react";
import "./Register.css";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isPending, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(displayName, email, password);
    setDisplayName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form className="login-form">
      <h2>Register</h2>

      <label>
        <span>Display name: </span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          required
        ></input>
      </label>
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
      {!isPending && (
        <button onClick={handleSubmit} className="btn">
          Register
        </button>
      )}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
