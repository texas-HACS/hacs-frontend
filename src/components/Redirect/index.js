import React, { useEffect, useState } from "react";
import "./Redirect.scss";

function Redirect(props) {
  const [dest, setDest] = useState(props.to);

  useEffect(() => {
    setDest(props.to);
  }, [props.to]);

  useEffect(() => {
    if (dest) {
      setTimeout(() => {
        window.open(dest.link, "_self");
      }, 1000);
    }
  });

  return (
    <div className="redirect">
      {!dest ? (
        <p>
          Unable to redirect...
          <br />
          Please reach out to{" "}
          <a className="fancy" href="mailto:texashacs@gmail.com">
            texashacs@gmail.com
          </a>{" "}
          for assistance if you think this is incorrect.
        </p>
      ) : (
        <p>
          Redirecting to{" "}
          <a className="fancy" href={dest.link} target={dest.target}>
            {dest.link}
          </a>{" "}
          ...
        </p>
      )}
    </div>
  );
}

export default Redirect;
