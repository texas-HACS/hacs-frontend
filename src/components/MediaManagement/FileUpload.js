import React, { useRef, useState } from "react";
import firebase from "../../_firebase";
import CloseButton from "../partials/CloseButton";

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState();
  const fileInputField = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const selectFile = (event) => {
    fileInputField.current.click();
  };

  const removeFile = (event) => {
    setSelectedFile(null);
    fileInputField.current.value = null;
    if (props.onRemoveFile) {
      props.onRemoveFile();
    }
  };

  const uploadFile = async () => {
    const file = selectedFile;
    const path = props.path ?? "";
    await firebase.storage.uploadFile(path + file.name, file);

    const url = await firebase.storage.getFileURL(path + file.name);

    if (props.onUploadFile) {
      props.onUploadFile({ url, name: file.name, path });
    }
  };

  return (
    <div className="file-upload flex-row">
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputField}
        style={{ display: "none" }}
        onClick={(event) => (event.target.value = null)}
      />
      {selectedFile ? (
        <div className={"flex-row"}>
          <p>{selectedFile.name}</p>
          <CloseButton icon onClick={removeFile} />
          <button className="change-button" onClick={selectFile}>
            Change
          </button>
          <button className="upload-button" onClick={uploadFile}>
            Confirm
          </button>
        </div>
      ) : (
        <button className="select-file-button" onClick={selectFile}>
          Upload New
        </button>
      )}
    </div>
  );
}

export default FileUpload;
