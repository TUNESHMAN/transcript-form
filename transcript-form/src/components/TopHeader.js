import React from "react";
import runLogo from "../images/runlogo.jpg";

const TopHeader = () => (
  <header className="header">
    <span className="logo">
      {/* <Link href="/"> */}
      <a href="/" className="no-underline">
        <img
          src={runLogo}
          alt="runLogo"
          style={{ height: "3.95rem" }}
          className="logo-pics"
        />
      </a>
      {/* </Link> */}
    </span>
  </header>
);

export default TopHeader;
