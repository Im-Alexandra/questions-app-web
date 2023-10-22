import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { AnimatePresence, motion } from "framer-motion";

import emailIcon from "../../assets/email.svg";
import passwordIcon from "../../assets/password.svg";
import nameIcon from "../../assets/profileGreen.svg";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useLogout } from "../../hooks/useLogout";
import { useDocument } from "../../hooks/useDocument";

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

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export default function Profile() {
  const anonymousPhoto =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  const { user } = useAuthContext();
  const { documents: games } = useCollection(`users/${user.uid}/games`);
  const navigate = useNavigate();
  const { uploadProfilePhoto, response } = useFirestore();
  const { logout, isPending } = useLogout();
  const { document: userInfo } = useDocument(
    `users`, user.uid);

  const [visibleName, setVisibleName] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setDisplayName(user.displayName);
      setVisibleName(user.displayName);
      setPassword(user.password);
      setPhoto(user.photoURL === null ? anonymousPhoto : user.photoURL);
    }
    if (userInfo) {
      setIsAdmin(userInfo.admin || false)
    }
  }, [user,userInfo]);

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

  const handleEdit = async (e) => {
    setFormErrors([]);
    e.preventDefault();

    if (canEdit) {
      //console.log("saving");
      if (newPhoto) {
        uploadProfilePhoto(newPhoto, user);
      }
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName: displayName.trim() })
          .then(() => {
            setVisibleName(user.displayName);
          })
          .catch((error) => {
            setFormErrors([...formErrors, error]);
            setDisplayName(user.displayName);
          });
      }
      if (email !== user.email) {
        await updateEmail(user, email.trim())
          .then(() => {})
          .catch((error) => {
            setFormErrors([...formErrors, error]);
            setEmail(user.email);
          });
      }
      if (password !== user.password) {
        if (repeatPassword !== "") {
          if (password !== repeatPassword) {
            let error = {
              type: "password",
              message: "The passwords must match",
            };
            setFormErrors([...formErrors, error]);
            setPassword(user.password);
          } else {
            updatePassword(user, password).catch((error) => {
              setFormErrors([...formErrors, error]);
              setPassword(user.password);
            });
          }
        }
      }
    }

    canEdit ? setCanEdit(false) : setCanEdit(true);
  };

  useEffect(() => {
    if (response.success) {
      //console.log(response);
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
      <h2 className="text-center">Profile</h2>
      <div className="avatar">
        <div className="wrapper">
          <div className="pic">
            <AnimatePresence>
              {canEdit && (
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overlay"
                >
                  <p>Click to change avatar</p>
                </motion.div>
              )}
            </AnimatePresence>

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
        <div className="top">
          <h3 className="text-center">{visibleName}</h3>

          <form>
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

            {canEdit && (
              <>
                <label>
                  <span>
                    <img className="icon" src={passwordIcon} alt="password" />
                  </span>
                  <input
                    disabled={canEdit ? "" : "disabled"}
                    type="password"
                    value={password || ""}
                    required
                    autoComplete="password"
                    placeholder="New password"
                    onChange={(e) => {
                      setPassword(e.target.value);
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
                    required
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                    autoComplete="password"
                    placeholder="Repeat password"
                  ></input>
                </label>
              </>
            )}
          </form>
          {formErrors &&
            formErrors.map((e) => (
              <p key={e} className="error">
                {e.message}
              </p>
            ))}

          <button className="btn" onClick={handleEdit}>
            {canEdit ? "Save changes" : "Edit profile"}
          </button>

          {isAdmin && (
            <p>👑 admin 👑</p>
          )}
        </div>

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
          {!isPending && (
            <button className="btn logout" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn logout" disabled>
              Loading
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
