import React from "react";
import CroppedImage from "../partials/Images/CroppedImage";
import { renderStartAndEndDateTime } from "../utils/utils";
import "./Opportunities.scss";
import { HACS_LOGO_URL } from "./utils";

function EventCard(props) {
  const { e: event } = props;

  return (
    <div
      className="event-container opportunity flex card"
      onClick={() => props.onClick(event)}
    >
      <div
        className={`card-overlay ${
          new Date() > new Date(event.endTime) ? "past" : "future"
        }`}
        key={props.key}
      />
      <div className="event-image">
        <CroppedImage {...event.image} alt="event-view" />
      </div>
      <div className="details flex">
        <h3 className="title">{event.title}</h3>
        <div className="event-extras-container flex">
          <div className="event-time-container">
            <span className="time">
              {renderStartAndEndDateTime(event.startTime, event.endTime)}
            </span>
          </div>
          <button onClick={() => props.onClick(event)}>See More</button>
          {/* <div className="event-links-container flex-row">
          <LinkButton to={e.rsvpLink} className="rsvp-link">
            RSVP
          </LinkButton>
          <LinkButton to={e.meetingLink} className="meeting-link">
            JOIN
          </LinkButton>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
