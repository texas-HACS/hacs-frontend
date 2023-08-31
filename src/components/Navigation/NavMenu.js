import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestNavLink from "../../testing/TestNavLink";

export default function NavMenu(props) {
  // might be able to remove the menuOpen stuff
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(props.isOpen);
  }, [props.isOpen]);

  let newsletterLink, developLink;
  if (props.redirects) {
    ({ newsletterLink, developLink } = props.redirects);
  }

  const links = (
    <Fragment>
      <Link to="/home">
        <div className="nav-link">Home</div>
      </Link>
      {/* <Link to="/about">
        <div className="nav-link">About</div>
      </Link> */}
      <Link to="/familias">
        <div className="nav-link">Familias</div>
      </Link>
      <Link to="/opportunities">
        <div className="nav-link">Opportunities</div>
      </Link>
      {/* target opens a new tab so when making their pages remove them */}
      <Link to="/newsletter" target={newsletterLink?.target}>
        <div className="nav-link">Newsletter</div>
      </Link>
      <Link to="/develop" target={developLink?.target}>
        <div className="nav-link">Develop</div>
      </Link>
      {/* <Link to="/contact" onClick={()=>props.tm(false)}>
              <div className="nav-link">Contact</div>
            </Link> */}
      <Link to="/sign-in">
        <div className="nav-link">Sign In</div>
      </Link>
      <Link to="/admin">
        <div className="nav-link">
          <i className="fas fa-cog" />
        </div>
      </Link>
      {/* The TestNavLink below should only be used in cases where you want to test how things will
      render on the website. Make sure to comment it out before pushing to github. To test things
      just add your code to TestPage.js */}
      {/* <TestNavLink /> */}
    </Fragment>
  );

  return (
    <div className="navigation-container" ref={props.element}>
      <section
        className={`flex ${
          props.sticky ? "navigation-sticky navigation" : "navigation"
        }`}
      >
        <div className="navigation-links-container">{links}</div>{" "}
      </section>
    </div>
  );
}
