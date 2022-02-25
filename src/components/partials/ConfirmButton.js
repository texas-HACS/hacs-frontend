import React from "react";
import "./ConfirmButton.scss";

function ConfirmButton(props) {
  return (
    <button
      className={`confirm-button ${props.className} ${
        props.icon ? "icon" : null
      }`}
      onClick={props.onClick}
    >
      <i className="fa fa-check" />
    </button>
  );
}
export default ConfirmButton;
