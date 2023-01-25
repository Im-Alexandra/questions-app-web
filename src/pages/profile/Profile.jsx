import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { motion } from "framer-motion";

import arrow from "../../assets/leftArrowOrange.svg";
import emailIcon from "../../assets/email.svg";
import passwordIcon from "../../assets/password.svg";
import nameIcon from "../../assets/profileGreen.svg";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

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
  const { documents: games } = useCollection(`users/${user.uid}/games`);
  const navigate = useNavigate();
  const { uploadProfilePhoto, response } = useFirestore();

  const [email, setEmail] = useState(user?.email);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [password, setPassword] = useState(user?.password);
  const [photo, setPhoto] = useState(
    user?.photoURL === null ? anonymousPhoto : user?.photoURL
  );
  const [newPhoto, setNewPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  const handleFileChanged = (e) => {
    setNewPhoto(null);
    let selected = e.target.files[0];

    if (!selected) {
      setPhotoError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setPhotoError("Selected file must be an image");
      return;
    }
    if (selected.size > 100000) {
      setPhotoError("Image file size must be less than 100kb");
      return;
    }
    let url = URL.createObjectURL(selected);
    setPhotoError(null);
    setNewPhoto(selected);
    setPhoto(url);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    canEdit ? setCanEdit(false) : setCanEdit(true);

    if (canEdit) {
      //console.log("saving");
      if (newPhoto) {
        uploadProfilePhoto(newPhoto, user);
      }
    } else {
      //console.log("editing");
    }
  };

  useEffect(() => {
    if (response.success) {
      console.log(response);
    }
  }, [response, response.success]);

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
          <div className="pic">
            <img src={photo} alt="avatar" />
            <input
              type="file"
              onChange={handleFileChanged}
              accept="/image/*"
              disabled={canEdit ? "" : "disabled"}
            ></input>
          </div>

          <div className="count-section">
            <div className="count">
              <p>{games?.length}</p>
            </div>
            <p className="bot-text">
              {games?.length === 1 ? "GAME COMPLETED" : "GAMES COMPLETED"}
            </p>
          </div>
        </div>
      </div>
      {photoError && <p className="error text-center">{photoError}</p>}

      <div className="content">
        <form>
          <h3>{displayName}</h3>

          <label>
            <span>
              <img className="icon" src={nameIcon} alt="email" />
            </span>
            <input
              disabled={canEdit ? "" : "disabled"}
              type="text"
              value={displayName}
              required
              autoComplete="name"
              placeholder="Display name"
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
              disabled={canEdit ? "" : "disabled"}
              type="email"
              value={email}
              required
              autoComplete="email"
              placeholder="Email"
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
              disabled={canEdit ? "" : "disabled"}
              type="password"
              value={password}
              required
              autoComplete="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </label>

          {canEdit && (
            <label>
              <span>
                <img className="icon" src={passwordIcon} alt="password" />
              </span>
              <input
                disabled={canEdit ? "" : "disabled"}
                type="password"
                required
                autoComplete="password"
                placeholder="Repeat password"
              ></input>
            </label>
          )}

          <button className="btn" onClick={handleEdit}>
            {canEdit ? "Save changes" : "Edit profile"}
          </button>
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
