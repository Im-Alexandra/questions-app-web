import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import arrow from "../assets/leftArrowOrange.svg";

export default function Profile() {
  const fakeUser = {
    displayName: "Saska",
    photoUrl: "https://i.imgur.com/v9Ibdeq.jpeg",
    games: {
      i5zsZST0ksTL7oyw1StI0BZ8Xd23: {
        date: "04/01/2023",
        note: "Good game",
        players: ["Melina", "Katica"],
        questions: [
          "bTo0I8p4eRxDaSV1Q91w",
          "sXTQgyYEopAfsQQjiQC5",
          "sXTQgyYEopAfsQQjiQC5",
        ],
      },
    },
  };

  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="container profile">
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        Profile
      </h2>
      <div className="avatar">
        <div className="wrapper">
          <div
            className="pic"
            style={{ backgroundImage: "url(" + fakeUser.photoUrl + ")" }}
          ></div>
          <div className="game-count">
            <p>2</p>
          </div>
        </div>
      </div>
      <h3>{user.displayName}</h3>
      <p>Email: {user.email}</p>
    </div>
  );
}
