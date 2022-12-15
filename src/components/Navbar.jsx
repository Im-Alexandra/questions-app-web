import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Logo</Link>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {user && (
          <li className="align-right">
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {user && (
          <>
            {!isPending && <span onClick={logout}>Logout</span>}
            {isPending && <span disabled>Loading</span>}
          </>
        )}
      </ul>
    </div>
  );
}
