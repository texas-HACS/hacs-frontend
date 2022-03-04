import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Loading/Loading";
import AdminAuth from "./AdminAuth";

// Built with the help of https://ui.dev/react-router-v5-protected-routes-authentication/

export default function PrivateRoute(props) {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setInitialized(props.init);
  }, [props.init]);

  const loggedIn = AdminAuth(user);
  return initialized ? (
    loggedIn ? (
      <Outlet />
    ) : (
      <Navigate to={"/login"} />
    )
  ) : (
    <Loading />
  );
}
