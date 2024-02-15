import React from "react";
import arrow_left from "../../assets/icons/arrow_left.svg";
import "./index.css";

const NavBar = ({ title }) => {
  return (
    // <header className="site-header">
    //     <button className="back-button">
    //         <img src={arrow_left} alt="Back" />
    //     </button>
    //     <h1 className="site-title">{title}</h1>
    // </header>
    <header className="site-header">
      <button className="back-button">
        <img src={arrow_left} alt="Back" />
      </button>
      <h1 className="site-title">{title}</h1>
      <div></div> {/* Empty div to balance out the back button */}
    </header>

  );
};

export default NavBar;
