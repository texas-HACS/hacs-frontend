import React, { Fragment, useEffect, useState } from "react";
import FileSystem from "../MediaManagement/FileSystem/FileSystem";
import CloseButton from "../partials/CloseButton";

export const selectionTypes = { UPLOAD: "upload", SELECT: "select" };

function FileEdit(props) {
  const [file, setFile] = useState(props.file);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!file) {
      setFile(props.file);
    }
  }, [props.file]);

  const handleSelectFile = (f) => {
    setFile(f);
    setEditing(false);
    if (props.onSelectFile) {
      props.onSelectFile(f);
    }
  };
  const removeFile = (f) => {
    setFile(null);
    props.onRemoveFile();
  };

  return editing ? (
    <Fragment>
      <CloseButton icon onClick={() => setEditing(false)} />
      <FileSystem onSelectFile={handleSelectFile} />
    </Fragment>
  ) : file ? (
    <div id="existing-file" className="flex-row">
      <p>{file.name}</p>
      <CloseButton icon onClick={removeFile} />
    </div>
  ) : (
    <div>
      <button onClick={() => setEditing(true)}>Choose File</button>
    </div>
  );
}

export default FileEdit;
