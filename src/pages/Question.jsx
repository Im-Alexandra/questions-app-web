import React from "react";
import { useParams } from "react-router-dom";
import "./Question.css";

export default function Question() {
  const { id } = useParams();
  return <div className="container">Question {id}</div>;
}
