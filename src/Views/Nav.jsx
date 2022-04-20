import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
  const navStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: 20,
    width: 400,
    height: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    float: "right",
  };

  const navLoginStyle = {
    display: "flex",
    width: 400,
    justifyContent: "center",
    float: "right",
    position: "absolute",
    left: 1500,
  };

  const navContainerStyle = {
    display: "flex",
    width: "90%",
    justifyContent: "spaceBetween",
    float: "left",
    color: "white",
    textDecoration: "none",
    fontSize: 20,
  };

  return (
    <nav>
      <div className="divContainer" style={navContainerStyle}>
        <ul className="nav-links">
          <Link style={navContainerStyle} to="/">
            <li>
              <h2>Rezervacija terena</h2>
            </li>
          </Link>
          <div className="navLogin" style={navLoginStyle}>
            <Link style={navStyle} to="/login">
              <li>Login</li>
            </Link>
            <Link style={navStyle} to="/register">
              <li>Register</li>
            </Link>
            <Link style={navStyle} to="/admin">
              <li>Admin</li>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
