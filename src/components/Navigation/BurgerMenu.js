import React, { Fragment, useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default function BurgerMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  // this useEffect might not be needed
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  const toggleMenu = (isOpen) => {
    setMenuOpen(isOpen);
  };

  // these lines might not be needed as well
  let meetingLink, newsletterLink, developLink;
  if (props.redirects) {
    ({ meetingLink, newsletterLink, developLink } = props.redirects);
  }

  const links = (
    <section className="flex burger-menu-links">
      <Link to="/home" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Home</div>
      </Link>
      {/* <Link to="/about">
        <div className="nav-link" onClick={() => toggleMenu(false)}>
          About
        </div>
      </Link> */}
      <Link to="/opportunities" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Opportunities</div>
      </Link>
      <Link to="/meet" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Meet</div>
      </Link>
      <Link to="/newsletter" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Newsletter</div>
      </Link>
      <Link to="/develop" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Develop</div>
      </Link>
      {/* <Link to="/contact" onClick={() => toggleMenu(false)}>
              <div className="nav-link">Contact</div>
            </Link> */}
      <Link to="/sign-in" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Sign In</div>
      </Link>
      <Link to="/admin" aria-label="admin" onClick={() => toggleMenu(false)}>
        <div className="nav-link">
          <i className="fas fa-cog" />
        </div>
      </Link>
    </section>
  );

  return (
    <div className="burger-menu">
      <Menu
        right
        isOpen={menuOpen}
        onStateChange={(state) => toggleMenu(state.isOpen)}
      >
      {links}
      </Menu>
    </div>
  );
}
