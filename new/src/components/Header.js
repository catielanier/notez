import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header>
      <div className="grid-container">
        <div className="title">
          <h1>NoteZ</h1>
        </div>
        <nav>
          <ul>
            {!props.user && (
              <>
                <Link to="/login">
                  <li>Login</li>
                </Link>
                <Link to="/signup">
                  <li>Signup</li>
                </Link>
              </>
            )}
            {props.user && (
              <>
                <Link to="/game">
                  <li>Game Notes</li>
                </Link>
                <Link to="/player">
                  <li>Player Notes</li>
                </Link>
                <Link to="/profile">
                  <li>Profile</li>
                </Link>
                <button>
                  <li>Logout</li>
                </button>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
