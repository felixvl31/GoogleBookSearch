import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <span className="navbar-brand" href="/">
        Google Books Search
      </span>
      
      <span> 
       <Link to="/search" className={props.location.pathname === "/search" || props.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Search
      </Link></span>
      <span>       
      <Link to="/saved" className={props.location.pathname === "/saved" ? "nav-link active" : "nav-link"}>
          Saved
      </Link></span>
    </nav>
  );
}

export default Nav;
