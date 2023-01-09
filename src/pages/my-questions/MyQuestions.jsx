import React, { useState } from "react";
import "./MyQuestions.css";
import { useNavigate } from "react-router-dom";

import arrow from "../../assets/leftArrowOrange.svg";
import timeWhite from "../../assets/timeWhite.svg";
import timeOrange from "../../assets/timeOrange.svg";
import heartWhite from "../../assets/heartWhite.svg";
import heartOrange from "../../assets/heartOrange.svg";
import plusWhite from "../../assets/plusWhite.svg";
import plusOrange from "../../assets/plusOrange.svg";
import Saved from "./Saved";
import Favourites from "./Favourites";
import Add from "./Add";

export default function MyQuestions() {
  const navigate = useNavigate();
  const [currentSubPage, setCurrentSubPage] = useState("saved");

  const fakeUser = {
    displayName: "Saska",
    photoUrl: "https://imgur.com/a/WcxKBnu",
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
    questions: {
      saved: [
        {
          id: "85yz7xyGKkBRbjiPoPw9",
          question:
            "How would you look and behave if you were a Professor of Happiness?",
          tags: ["justMet", "famFriendly", "fun"],
          players: ["Melina", "Katica", "Saska"],
        },
      ],
      favourites: [
        {
          id: "WEPyyemooR6v43r0AoVp",
          question:
            "In which moment in history of the humanity would you place yourself and why?",
          tags: ["justMet", "famFriendly", "fun"],
        },
        {
          id: "85yz7xyGKkBRbjiPoPw9",
          question:
            "How would you look and behave if you were a Professor of Happiness?",
          tags: ["fun"],
        },
        {
          id: "kOXnYuNneVcoopXbpJa5",
          question: "Test question",
          tags: ["justMet", "connection"],
        },
      ],
      added: [
        {
          id: "kOXnYuNneVcoopXbpJa5",
          question: "Test question",
          tags: ["justMet", "famFriendly", "fun"],
        },
      ],
    },
  };

  return (
    <div className="container my-questions">
      <h2 className="text-center">
        <img
          src={arrow}
          alt="arrow"
          className="go-back"
          onClick={() => navigate(-1)}
        />
        QUESTIONS
      </h2>
      <div className="top-nav">
        <div className="wrapper">
          <div
            className={currentSubPage === "saved" ? "circle active" : "circle"}
            onClick={() => setCurrentSubPage("saved")}
          >
            <img
              src={currentSubPage === "saved" ? timeWhite : timeOrange}
              alt="saved"
            />
          </div>
        </div>
        <div className="wrapper">
          <div
            className={
              currentSubPage === "favourites" ? "circle active" : "circle"
            }
            onClick={() => setCurrentSubPage("favourites")}
          >
            <img
              src={currentSubPage === "favourites" ? heartWhite : heartOrange}
              alt="favourites"
            />
          </div>
        </div>
        <div className="wrapper">
          <div
            className={currentSubPage === "add" ? "circle active" : "circle"}
            onClick={() => setCurrentSubPage("add")}
          >
            <img
              src={currentSubPage === "add" ? plusWhite : plusOrange}
              alt="add"
            />
          </div>
        </div>
      </div>
      {currentSubPage === "saved" && (
        <Saved questions={fakeUser.questions.saved} />
      )}
      {currentSubPage === "favourites" && (
        <Favourites questions={fakeUser.questions.favourites} />
      )}
      {currentSubPage === "add" && <Add questions={fakeUser.questions.added} />}
    </div>
  );
}
