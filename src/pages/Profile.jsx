import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import arrow from "../assets/leftArrowOrange.svg";

export default function Profile() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="text-center">
        {" "}
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        Profile
      </h2>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
