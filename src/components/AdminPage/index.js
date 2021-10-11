import React from "react";
import "./AdminPage.scss";
import AdminPanel from "./AdminPanel";

function AdminPage(props) {
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
