import React from "react";

function Title({ children }) {
  return (
    <div
      style={{ height: 100, clear: "both", paddingTop: 30, textAlign: "center" }}
      className="jumbotron header"
    >
      {children}
    </div>
  );
}

export default Title;
