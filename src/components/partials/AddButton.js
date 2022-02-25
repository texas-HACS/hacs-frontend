import React from "react";
import "./AddButton.scss";

function AddButton(props) {
  return (
    <button
      className={`add-button ${props.className} ${
        props.icon ? "icon" : null
      }`}
      onClick={props.onClick}
    >
      <i className="fa fa-plus" />
    </button>
  );
}
export default AddButton;
