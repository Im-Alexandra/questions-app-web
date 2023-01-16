import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { motion } from "framer-motion";

import arrow from "../../assets/leftArrowOrange.svg";
import emailIcon from "../../assets/email.svg";
import passwordIcon from "../../assets/password.svg";
import nameIcon from "../../assets/profileGreen.svg";
import editIcon from "../../assets/penOrange.svg";

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export default function Profile() {
  const anonymousPhoto =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user.email);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [password, setPassword] = useState(user.password);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container profile"
    >
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
          {user.photoURL && (
            <div
              className="pic"
              style={{ backgroundImage: "url(" + user.photoUrl + ")" }}
            ></div>
          )}
          {user.photoURL === null && (
            <div
              className="pic"
              style={{ backgroundImage: "url(" + anonymousPhoto + ")" }}
            ></div>
          )}

          <div className="count-section">
            <div className="count">
              <p>2</p>
            </div>
            <p className="bot-text">GAMES COMPLETED</p>
          </div>
        </div>
      </div>

      <div className="content">
        <form>
          <div className="form-header">
            <h3>{displayName}</h3>
            <img src={editIcon} alt="edit profile" />
          </div>
          <label>
            <span>
              <img className="icon" src={nameIcon} alt="email" />
            </span>
            <input
              type="text"
              value={displayName}
              required
              autoComplete="name"
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            ></input>
          </label>
          <label>
            <span>
              <img className="icon" src={emailIcon} alt="email" />
            </span>
            <input
              type="email"
              value={email}
              required
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </label>
          <label>
            <span>
              <img className="icon" src={passwordIcon} alt="password" />
            </span>
            <input
              type="password"
              value={password}
              required
              autoComplete="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </label>
        </form>

        <div className="bottom">
          <h3>Other</h3>
          <button
            className="btn"
            onClick={() => navigate("/profile/game-records")}
          >
            Game records
          </button>
          <button
            className="btn"
            onClick={() => navigate("/profile/added-questions")}
          >
            Added questions
          </button>
        </div>
      </div>
    </motion.div>
  );
}
