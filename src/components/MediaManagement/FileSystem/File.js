import React from "react";
import path from "path";
import firebase from "../../../_firebase";

function File(props) {
  const handleClick = async () => {
    const filePath = props.path
      ? props.path + path.sep + props.name
      : props.name;
    const url = await firebase.storage.getFileURL(filePath);
    props.handleClick({ url, name: props.name, path: props.path });
  };

  return (
    <div className="file" onClick={handleClick}>
      <i className="fas fa-file" />
      {props.name}
    </div>
  );
}

export default File;
