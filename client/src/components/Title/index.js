import React from "react";

function Title({ children }) {
  return (
    <div
      style={{ height: 100, clear: "both", paddingTop: 40, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Title;
