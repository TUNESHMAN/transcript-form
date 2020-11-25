import React from "react";
import runLogo from "../images/runlogo.jpg";

const TopHeader = () => (
  <header>
    <img className="logo" src={runLogo} alt="run" />
    <nav>
      <h1 className="nav-area">TRANSCRIPT APPLICATION FORM</h1>
    </nav>
  </header>
);

export default TopHeader;
