import React from "react";
import { SyncLoader } from "react-spinners";

export default function Spinner({ color }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SyncLoader color={color} size={9} speedMultiplier={0.7} />
    </div>
  );
}
