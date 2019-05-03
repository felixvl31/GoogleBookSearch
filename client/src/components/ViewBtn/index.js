import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function ViewBtn(props) {
  return (
    <a className="btn btn-success view-btn" href={props.link} target="_blank" rel="noopener noreferrer" role="button" tabIndex="0">
      View
    </a>
  );
}

export default ViewBtn;
