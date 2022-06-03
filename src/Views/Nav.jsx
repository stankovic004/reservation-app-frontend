import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <Link to="/">
          <li>
            <h2>Rezervacija terena</h2>
          </li>
        </Link>
        <div className="navLogin">
          <Link className="navItem" to="/login">
            <li>Login</li>
          </Link>
          <Link className="navItem" to="/register">
            <li>Register</li>
          </Link>
          {/* <Link style={navStyle} to="/admin">
              <li>Admin</li>
            </Link> */}
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
