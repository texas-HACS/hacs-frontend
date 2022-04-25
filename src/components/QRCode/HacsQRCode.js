import React, { Fragment, useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useLocation } from "react-router-dom";
import Logo from "../../media/hacs-logo-white-fill.png";

const HACS_BLUE = "#27246a";

export default function HacsQRCode(props) {
  const [url, updateUrl] = useState();

  useEffect(() => {
    if (props.url && props.url != url) {
      updateUrl(props.url);
    }
  }, [props.url]);

  const location = useLocation();

  useEffect(() => {
    const u = location.state?.url;
    if (u) {
      updateUrl(u);
    }
  }, []);

  var size = 1500;
  var logoWidth = 500;
  var eyeRadius = 10;
  var id = "hacs-qrcode";
  var wrapperClassName = "qrcode-wrapper";

  if (props.preview) {
    size = 300;
    logoWidth = 100;
    eyeRadius = 2;
    wrapperClassName += "-preview";
    id += "-preview";
  } else if (props.hideFullSize) {
    wrapperClassName += " invisible";
  }
  return (
    <div id="qrcode-wrapper" className={wrapperClassName}>
      {url ? (
        <QRCode
          id={id}
          value={url}
          ecLevel="H"
          size={size}
          fgColor={HACS_BLUE}
          logoImage={Logo}
          logoWidth={logoWidth}
          eyeRadius={eyeRadius}
        />
      ) : null}
    </div>
  );
}
