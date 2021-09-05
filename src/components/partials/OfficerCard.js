import React from "react";
import "./OfficerCard.scss";

function OfficerCard(props) {
  return (
    <div className="card">
      <img
        src={
          props.imageUrl ||
          "https://firebasestorage.googleapis.com/v0/b/hacs-opensource.appspot.com/o/hacs_logo.png?alt=media&token=993e859b-5ae1-47c3-9f51-cf414d833a2c"
        }
        alt={"An image of officer " + props.name}
      />
      <p className="name">{props.name}</p>
      <p className="role">{props.role}</p>
      <div className="connect">
        {props.linkedin ? (
          <a href={props.linkedin}>
            <i className="fab fa-linkedin"></i>
          </a>
        ) : (
          ""
        )}
        {props.email ? (
          <a href={"mailto:" + props.email}>
            <i className="far fa-envelope"></i>
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OfficerCard;
