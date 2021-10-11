import React from "react";
import "./FileSystem.scss";

function Folder(props) {
  return (
    <div className="folder" onClick={() => props.handleClick(props.name)}>
      <i className="far fa-folder" />
      {props.name}/
    </div>
  );
}

export default Folder;
