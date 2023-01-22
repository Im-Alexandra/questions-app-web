import React from "react";
import { useCollection } from "../hooks/useCollection";
import "./ScrollingCards.css";

export default function ScrollingCards({ category, questionCount, title }) {
  const { documents } = useCollection(
    "questions",
    ["tags", "array-contains", category],
    questionCount
  );

  return (
    <div className="horizontal-component">
      <h3>{title}</h3>
      <ul className="content">
        {documents?.map((q) => (
          <li key={q.id} className="horizontal-card">
            <p>{q.question}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}