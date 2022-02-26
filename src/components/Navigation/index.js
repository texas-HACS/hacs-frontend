import React, { Fragment } from "react";
import BurgerMenu from "./BurgerMenu";
import NavMenu from "./NavMenu";

function Navigation(props) {
  return (
    <Fragment>
      <NavMenu redirects={props.redirects} />
      <BurgerMenu redirects={props.redirects} />
    </Fragment>
  );
}

export default Navigation;
