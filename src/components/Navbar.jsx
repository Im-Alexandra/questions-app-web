import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import logo from "../assets/logo.svg";
import Spinner from "./Spinner";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">
            <img src={logo} alt="Get to know me" className="logo" />
          </Link>
        </li>
        {!user && (
          <li className="align-right">
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
            {!isPending && <span onClick={logout}>Logout</span>}
            {isPending && (
              <span disabled>
                <Spinner color="var(--black-spinner)" />
              </span>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
