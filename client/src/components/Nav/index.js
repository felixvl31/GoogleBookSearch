import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <li className="navbar-brand" href="/">
        Google Books
      </li>
      
      <span>       
       <Link to="/search" className={window.location.pathname === "/search" || window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Search
      </Link></span>
      <span>       
      <Link to="/saved" className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}>
          Saved
      </Link></span>
    </nav>
  );
}

export default Nav;
