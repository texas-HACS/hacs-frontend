import React, { Fragment, useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import Logo from "../../media/hacs-logo-white-fill.png";

const HACS_BLUE = "#27246a";

export default function HacsQRCode(props) {
  const [url, updateUrl] = useState();

  useEffect(() => {
    if (props.url != url) {
      updateUrl(props.url);
    }
  }, [props.url]);

  return (
    <div className="qrcode-wrapper">
      {url ? (
        <Fragment>
          <div id="full-res-qrcode-wrapper">
            <QRCode
              id="full-res-qrcode"
              value={url}
              ecLevel="H"
              size={1500}
              fgColor={HACS_BLUE}
              logoImage={Logo}
              logoWidth={500}
              eyeRadius={10}
            />
          </div>
          <QRCode
            id="low-res-qrcode-preview"
            value={url}
            ecLevel="H"
            size={300}
            fgColor={HACS_BLUE}
            logoImage={Logo}
            logoWidth={100}
            eyeRadius={2}
          />
        </Fragment>
      ) : (
        <div />
      )}
    </div>
  );
}
