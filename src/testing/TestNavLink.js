import React from "react";
import { Link } from "react-router-dom";
import config from "../_config";

function TestNavLink(props) {
  return config.env == "local" || config.env == "dev" ? (
    <Link to="/test">
      <div className="nav-link">Test</div>
    </Link>
  ) : null;
}

export default TestNavLink;
