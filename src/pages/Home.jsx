import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="container">
      <h1>Home</h1>
      <h2>Question of the day:</h2>
      <p>Name one of the happiest moments with me.</p>
      <button className="btn">New game</button>
      <h2>Previous sessions:</h2>
    </div>
  );
}
