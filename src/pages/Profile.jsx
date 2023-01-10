import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import arrow from "../assets/leftArrowOrange.svg";
import emailIcon from "../assets/email.svg";
import passwordIcon from "../assets/password.svg";

export default function Profile() {
  const fakeUser = {
    displayName: "Saska",
    email: "sasa.labusova@gmail.com",
    password: "fakePass",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxeVKKhcw5BVb33-sIFbVwBxpGvFjAORNkHA&usqp=CAU",
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
          <div className="count-section">
            <div className="count">
              <p>2</p>
            </div>
            <p className="bot-text">GAMES COMPLETED</p>
          </div>
        </div>
      </div>
      <h3>{user.displayName}</h3>
      <form>
        <label>
          <span>
            <img className="icon" src={emailIcon} alt="email" />
          </span>
          <input
            type="email"
            value={user.email}
            required
            autoComplete="email"
          ></input>
        </label>
        <label>
          <span>
            <img className="icon" src={passwordIcon} alt="password" />
          </span>
          <input
            type="password"
            value={user.password}
            required
            autoComplete="password"
          ></input>
        </label>
      </form>
    </div>
  );
}
