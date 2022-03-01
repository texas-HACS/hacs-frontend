import React from "react";

function OfficerCard(props) {
  return (
    <div className="card">
      <img
        src={
          props.image?.url ||
          "https://firebasestorage.googleapis.com/v0/b/hacs-opensource-int.appspot.com/o/filler_person.jfif?alt=media&token=807c8a21-7ac3-4504-87de-7ef45a7ce800"
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
