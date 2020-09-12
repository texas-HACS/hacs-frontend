import React from "react";
import "./OfficerCard.scss";

function OfficerCard(props) {
    return (
        <div className="card">
            <img src={props.imageUrl} alt={"An image of officer " + props.name} />
            <p className="name">{props.name}</p>
            <p className="role">{props.role}</p>
            <div className="connect">
                <a href={props.linkedin}><i className="fab fa-linkedin"></i></a>
                <a href={"mailto:" + props.email}><i className="far fa-envelope"></i></a>
            </div>
        </div>
    );
}

export default OfficerCard;