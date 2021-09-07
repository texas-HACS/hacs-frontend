import React from "react";
import { Redirect } from "react-router-dom";

function LinkButton(props) {
  return props.to ? (
    <a href={props.to} className={props.className}>
      <button>{props.children}</button>
    </a>
  ) : null;
}

export default LinkButton;
