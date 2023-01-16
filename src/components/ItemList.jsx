import React from "react";
import "./ItemList.css";
import Spinner from "./Spinner";

export default function ItemList({
  children,
  isPending,
  error,
  noDocsMessage,
  documents,
}) {
  return (
    <div className="item-list">
      {isPending && <Spinner color="var(--blue-spinner)" />}
      {children}
      {documents && documents.length === 0 && <p>{noDocsMessage}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
