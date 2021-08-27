import React, { Fragment } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";

function Navigation(props) {
  let { meetingLink, newsletterLink, developLink } = props.redirects;

  return (
    <Fragment>
      <div className="navigation-container" ref={props.element}>
        <section
          className={`flex ${
            props.sticky ? "navigation-sticky navigation" : "navigation"
          }`}
        >
          <div className="navigation-links-container">
            <Link to="/home">
              <div className="nav-link">Home</div>
            </Link>
            <Link to="/about">
              <div className="nav-link">About</div>
            </Link>
            <Link to="/opportunities">
              <div className="nav-link">Opportunities</div>
            </Link>
            <Link to="/meet" target={meetingLink.target}>
              <div className="nav-link">Meet</div>
            </Link>
            <Link to="/newsletter" target={newsletterLink.target}>
              <div className="nav-link">Newsletter</div>
            </Link>
            <Link to="/develop" target={developLink.target}>
              <div className="nav-link">Develop</div>
            </Link>
            {/* <Link to="/contact">
              <div className="nav-link">Contact</div>
            </Link> */}
            <Link to="/admin">
              <div className="nav-link">Admin</div>
            </Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default Navigation;
