import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuthContext();
  return (
    <div className="container">
      <h1>Profile</h1>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
