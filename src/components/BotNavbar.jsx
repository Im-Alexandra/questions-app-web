import React from "react";
import "./BotNavbar.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import profileIcon from "../assets/profile.svg";
import home from "../assets/home.svg";
import questionsIcon from "../assets/questions.svg";
import playIcon from "../assets/play.svg";

export default function BotNavbar() {
  const location = useLocation();
  return (
    <div className="bot-navbar" id="bot-navbar">
      <div className={location.pathname === "/" ? "active item" : "item"}>
        <NavLink to="/">
          <img src={home} alt="" className="icon" />
        </NavLink>
      </div>
      <div
        className={location.pathname === "/new-game" ? "active item" : "item"}
      >
        <NavLink to="/new-game">
          <img src={playIcon} alt="" className="icon" />
        </NavLink>
      </div>
      <div
        className={
          location.pathname === "/my-questions" ? "active item" : "item"
        }
      >
        <NavLink to="/my-questions">
          <img src={questionsIcon} alt="" className="icon" />
        </NavLink>
      </div>
      <div
        className={location.pathname === "/profile" ? "active item" : "item"}
      >
        <NavLink to="/profile">
          <img src={profileIcon} alt="" className="icon" />
        </NavLink>
      </div>
    </div>
  );
}
