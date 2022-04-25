import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Built with the help of https://ui.dev/react-router-v5-protected-routes-authentication/

export default function DisplayImg(props) {
  const [src, setSrc] = useState(null);

  const location = useLocation();
  useEffect(() => {
    const source = location.state?.src;
    if (source) {
      setSrc(source);
    }
  }, []);

  return <img src={src} height="300px"/>;
}
