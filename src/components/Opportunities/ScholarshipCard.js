import React from "react";
import CroppedImage from "../partials/Images/CroppedImage";
import LinkButton from "../partials/LinkButton";
import { renderTimeline } from "./utils";

function ScholarshipCard(props) {
  const { s: scholarship } = props;
  return (
    <div
      className="scholarship-container opportunity flex card"
      onClick={() => props.onClick(scholarship)}
    >
      <div className="scholarship-image">
        <CroppedImage {...scholarship.image} alt="scholarship-view" />
      </div>
      <div className="details flex">
        <h3 className="title">{scholarship.title}</h3>
        <div className="scholarship-extras-container flex">
          <LinkButton to={scholarship.link} className="scholarship-link">
            Visit Site
          </LinkButton>
          <div className="scholarship-timeline-container">
            {renderTimeline(scholarship.timeline)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipCard;
