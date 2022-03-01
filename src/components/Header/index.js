import React from "react";
import { Link } from "react-router-dom";
import Socials from "../partials/Socials";

function Header() {
  return (
    <div className="global-header-container">
      <div className="global-header">
        <Link to="/" className="header-desktop">
          <h3>Hispanic Association of Computer Scientists</h3>
        </Link>
        <h3 className="header-mobile">HACS</h3>
        <Socials />
      </div>
    </div>
  );
}

export default Header;
