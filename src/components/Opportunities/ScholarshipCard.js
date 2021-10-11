import React from "react";
import LinkButton from "../partials/LinkButton";
import "./Opportunities.scss";
import { HACS_LOGO_URL, renderTimeline } from "./utils";

function ScholarshipCard(props) {
  const { s } = props;
  return (
    <div
      className="scholarship-container opportunity flex card"
      onClick={() => props.onClick(s)}
    >
      <img
        src={s.image?.url ?? HACS_LOGO_URL}
        className="scholarship-image"
        alt="scholarship-view"
      />
      <div className="details">
        <h3 className="title">{s.title}</h3>
        <LinkButton to={s.link} className="scholarship-link">
          Visit Site
        </LinkButton>
        <div className="scholarship-timeline-container">
          {renderTimeline(s.timeline)}
        </div>
      </div>
    </div>
  );
}

export default ScholarshipCard;
