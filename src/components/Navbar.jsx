import React from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import logo from "../assets/logo.svg";
import Spinner from "./Spinner";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();
  const location = useLocation();

  return (
    <div className="navbar" id="navbar">
      <ul>
        <li>
          <Link to="/">
            <img src={logo} alt="Get to know me" className="logo" />
          </Link>
        </li>
        {!user && (
          <li className="align-right">
            <Link to="/login">Login</Link>
            {location.pathname === "/login" && (
              <motion.span
                transition={{ duration: 0.4, delay: 0.1 }}
                layoutId="rect"
                className="underline"
              ></motion.span>
            )}
          </li>
        )}
        {!user && (
          <li>
            <Link to="/register">Register</Link>
            {location.pathname === "/register" && (
              <motion.span
                transition={{ duration: 0.4, delay: 0.1 }}
                layoutId="rect"
                className="underline"
              ></motion.span>
            )}
          </li>
        )}
        {user && (
          <>
            <li className="align-right logout">
              {!isPending && <span onClick={logout}>Logout</span>}
              {isPending && (
                <span disabled>
                  <Spinner color="var(--black-spinner)" />
                </span>
              )}
            </li>
            <li className="align-right desktop-only">
              <Link to="/">Home</Link>
              {location.pathname === "/" && (
                <motion.span
                  transition={{ duration: 0.4, delay: 0.1 }}
                  layoutId="rect"
                  className="underline"
                ></motion.span>
              )}
            </li>
            <li className="desktop-only">
              <Link to="/new-game">Play</Link>
              {location.pathname === "/new-game" && (
                <motion.span
                  transition={{ duration: 0.4, delay: 0.1 }}
                  layoutId="rect"
                  className="underline"
                ></motion.span>
              )}
            </li>
            <li className="desktop-only">
              <Link to="/my-questions">Questions</Link>
              {location.pathname === "/my-questions" && (
                <motion.span
                  transition={{ duration: 0.4, delay: 0.1 }}
                  layoutId="rect"
                  className="underline"
                ></motion.span>
              )}
            </li>
            <li className="desktop-only">
              <Link to="/profile">Profile</Link>
              {location.pathname === "/profile" && (
                <motion.span
                  transition={{ duration: 0.4, delay: 0.1 }}
                  layoutId="rect"
                  className="underline"
                ></motion.span>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
