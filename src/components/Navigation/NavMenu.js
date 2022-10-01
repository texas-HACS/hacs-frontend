import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestNavLink from "../../testing/TestNavLink";

export default function NavMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(props.isOpen);
  }, [props.isOpen]);

  let meetingLink, newsletterLink, developLink;
  if (props.redirects) {
    ({ meetingLink, newsletterLink, developLink } = props.redirects);
  }

  const links = (
    <Fragment>
      <Link to="/home">
        <div className="nav-link">Home</div>
      </Link>
      {/* <Link to="/about">
        <div className="nav-link">About</div>
      </Link> */}
      <Link to="/opportunities">
        <div className="nav-link">Opportunities</div>
      </Link>
      <Link to="/meet" target={meetingLink?.target}>
        <div className="nav-link">Meet</div>
      </Link>
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
    </Fragment>
  );

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  };

  return (
    <div className="navigation-container" ref={props.element}>
      <section
        className={`flex ${
          props.sticky ? "navigation-sticky navigation" : "navigation"
        }`}
        onClick={scrollToTop}
      >
        <div className="navigation-links-container">{links}</div>{" "}
      </section>
    </div>
  );
}
