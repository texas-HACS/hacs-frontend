import React, { useState, useCallback, useEffect } from "react";
import { HACS_LOGO_URL } from "../../Opportunities/utils";
import getCroppedImg from "../../utils/cropImage";


const CroppedImage = (props) => {
  const [inputImage, setInputImage] = useState(null);
  const [displayUrl, setDisplayUrl] = useState(null);

  const { crop, name, path, url } = props;
  useEffect(() => {
    let img = null;
    if (crop) img = { ...img, crop };
    if (name) img = { ...img, name };
    if (path) img = { ...img, path };
    if (url) img = { ...img, url };
    setInputImage(img);
  }, [crop, name, path, url]);
  console.log(inputImage);
  useEffect(() => {
    if (inputImage && inputImage.crop) {
      getCroppedImg(inputImage.url, inputImage.crop)
        .then((croppedUrl) => {
          setDisplayUrl(croppedUrl);
        })
        .catch((e) => {
          return setDisplayUrl(inputImage.url);
        });
    }
  }, [inputImage]);

  return (
    <img
      src={displayUrl ?? HACS_LOGO_URL}
      id={props.id}
      className={props.className}
      alt={props.alt}
      style={props.style}
    />
  );
};

export default CroppedImage;
