import React from "react";
import { Route } from "react-router";
import config from "../_config";
import TestPage from "./TestPage";

function TestRoute(props) {
  return config.env == "local" || config.env == "dev" ? (
    <Route path="/test">
      <TestPage />
    </Route>
  ) : null;
}

export default TestRoute;
