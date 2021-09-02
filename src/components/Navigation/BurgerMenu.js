import React, { Fragment, useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./BurgerMenu.scss";

export default function BurgerMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);

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

  let meetingLink, newsletterLink, developLink;
  console.log(props.redirects)
  if (props.redirects) {
    ({ meetingLink, newsletterLink, developLink } = props.redirects);
  }

  const links = (
    <Fragment>
      <Link to="/home" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Home</div>
      </Link>
      <Link to="/about">
        <div className="nav-link" onClick={() => toggleMenu(false)}>
          About
        </div>
      </Link>
      <Link to="/opportunities" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Opportunities</div>
      </Link>
      <Link
        to="/meet"
        target={meetingLink?.target}
        onClick={() => toggleMenu(false)}
      >
        <div className="nav-link">Meet</div>
      </Link>
      <Link
        to="/newsletter"
        target={newsletterLink?.target}
        onClick={() => toggleMenu(false)}
      >
        <div className="nav-link">Newsletter</div>
      </Link>
      <Link
        to="/develop"
        target={developLink?.target}
        onClick={() => toggleMenu(false)}
      >
        <div className="nav-link">Develop</div>
      </Link>
      {/* <Link to="/contact" onClick={() => toggleMenu(false)}>
              <div className="nav-link">Contact</div>
            </Link> */}
      <Link to="/admin" onClick={() => toggleMenu(false)}>
        <div className="nav-link">Admin</div>
      </Link>
    </Fragment>
  );

  return (
    <div className="burger-menu">
      <Menu
        right
        isOpen={menuOpen}
        onStateChange={(state) => toggleMenu(state.isOpen)}
      >
        <section className="flex">{links}</section>
      </Menu>
    </div>
  );
}
