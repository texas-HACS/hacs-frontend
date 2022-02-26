import shadows from "@material-ui/core/styles/shadows";
import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = (props) => {
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState({ url: props.url });
  const { crop, url } = props;

  useEffect(() => {
    let img = null;
    if (crop) img = { ...img, crop };
    if (url) img = { ...img, url };
  }, [crop, url]);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    const newImage = { url: image.url, crop: croppedAreaPixels };
    setImage(newImage);

    if (props.onChange) {
      props.onChange(croppedAreaPixels);
    }
  }, []);

  return (
    <div>
      <div
        className="crop-container flex"
        style={props.style ?? { height: "100%", width: "100%" }}
      >
        <Cropper
          image={image.url}
          crop={shift}
          zoom={zoom}
          aspect={1}
          onCropChange={setShift}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          initialCroppedAreaPixels={image?.crop}
          zoomSpeed={.25}
        />
      </div>
      <div className="controls">
        <input
          type="range"
          defaultValue={zoom}
          min={1}
          max={3}
          step={0.05}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ImageCropper;
