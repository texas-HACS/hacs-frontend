import React, { useState } from "react";
import "./AdminPage.scss";
import Login from "../auth/Login.js";
import AdminPanel from "./AdminPanel";
import AdminAuth from "../auth/AdminAuth";

function AdminPage(props) {
  AdminAuth();
  return props.siteContent && props.opportunities ? (
    <AdminPanel
      data={props.siteContent}
      opportunities={props.opportunities}
      signoutUser={props.signoutUser}
      user={props.user}
    />
  ) : (
    <div />
  );
}

export default AdminPage;
