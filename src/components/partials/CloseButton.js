import React from "react";
import "./CloseButton.scss";

function CloseButton(props) {
  return (
    <button
      className={`close-button ${props.className} ${
        props.icon ? "icon" : null
      }`}
      onClick={props.onClick}
    >
      <i className="fa fa-times" />
    </button>
  );
}
export default CloseButton;
