import React from "react";
import "./Register.css";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";

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
    <div className="register container">
      <form className="login-form">
        <h1 className="text-center">Register</h1>

        <label>
          <span>Display name: </span>
          <input
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            required
            autoComplete="username"
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
        {!isPending && (
          <button onClick={handleSubmit} className="btn full-width">
            Register
          </button>
        )}
        {isPending && (
          <button className="btn full-width" disabled>
            Loading
          </button>
        )}
        {error && <p className="error">{error}</p>}
        <p style={{ marginTop: "100px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
