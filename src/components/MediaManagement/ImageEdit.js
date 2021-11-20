import React, { Fragment, useEffect, useState } from "react";
import ImageCropper from "../partials/Images/ImageCropper";
import FileEdit from "./FileEdit";

function ImageEdit(props) {
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null);

  const { crop, name, path, url } = props;

  useEffect(() => {
    let img = null;
    if (crop) img = { ...img, crop };
    if (name) img = { ...img, name };
    if (path) img = { ...img, path };
    if (url) img = { ...img, url };
    setImage(img);
  }, [crop, name, path, url]);

  const handleSelectImage = (i) => {
    setImage(i);
    setEditing(true);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (props.onRemoveImage) {
      props.onRemoveImage();
    }
  };

  const handleCropChange = (c) => {
    setImage({ ...image, crop: c });
  };

  const handleConfirm = () => {
    setEditing(false);
    if (props.onConfirm) {
      props.onConfirm({ ...image });
    }
  };

  var cropper;
  if (image) {
    cropper = editing ? (
      [
        <ImageCropper
          url={image.url}
          crop={image.crop}
          onChange={handleCropChange}
          style={{ height: "300px", width: "300px" }}
        />,
        <button onClick={() => handleConfirm()}>Confirm</button>,
      ]
    ) : (
      <button onClick={() => setEditing(true)}>Edit</button>
    );
  }

  return (
    <div>
      <FileEdit
        file={image}
        onSelectFile={handleSelectImage}
        onRemoveFile={handleRemoveImage}
      />
      {cropper}
    </div>
  );
}

export default ImageEdit;
