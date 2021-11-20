import React from "react";
import CroppedImage from "../partials/Images/CroppedImage";
import LinkButton from "../partials/LinkButton";
import "./Opportunities.scss";
import { HACS_LOGO_URL, renderLinks, renderTimeline } from "./utils";

function JobListingCard(props) {
  const { l: jobListing } = props;

  return (
    <div
      className="job-listing-container opportunity flex card"
      onClick={() => props.onClick(jobListing)}
    >
      <CroppedImage {...jobListing.image} alt="job-view" />
      <div className="details flex">
        <h3 className="title">{jobListing.title}</h3>
        <div className="job-extras-container flex">
          <LinkButton to={jobListing.link} className="job-link">
            Visit Site
          </LinkButton>
          <div className="job-timeline-container">
            {renderTimeline(jobListing.timeline)}
          </div>
          <div className="other-links-container">
            {renderLinks(jobListing.otherLinks)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListingCard;
