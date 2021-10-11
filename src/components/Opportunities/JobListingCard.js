import React from "react";
import LinkButton from "../partials/LinkButton";
import "./Opportunities.scss";
import { HACS_LOGO_URL, renderLinks, renderTimeline } from "./utils";

function JobListingCard(props) {
  const { l } = props;

  return (
    <div
      className="job-listing-container opportunity flex card"
      onClick={() => props.onClick(l)}
    >
      <img
        src={l.image?.url ?? HACS_LOGO_URL}
        className="scholarship-image"
        alt="scholarship-view"
      />
      <div className="details">
        <h3 className="title">{l.title}</h3>
        <div className="job-timeline-container">
          {renderTimeline(l.timeline)}
        </div>
        <LinkButton to={l.link} className="job-link">
          Visit Site
        </LinkButton>
        <div className="other-links-container">{renderLinks(l.otherLinks)}</div>
      </div>
    </div>
  );
}

export default JobListingCard;
