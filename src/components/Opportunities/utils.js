import React from "react";
import CroppedImage from "../partials/Images/CroppedImage";
import LinkButton from "../partials/LinkButton";
import {
  isoDateToDateTimeString,
  isoDateToDateString,
  prettyDateTimeString,
  renderStartAndEndDateTime,
} from "../utils/utils";
import EventCard from "./EventCard";
import JobListingCard from "./JobListingCard";
import ScholarshipCard from "./ScholarshipCard";

export const HACS_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/hacs-opensource.appspot.com/o/hacs-logo.png?alt=media&token=0ab02205-5b5f-4f8f-b15f-b80304ecea17";

// Return array from firestore object representation of array
function objectToArray(obj) {
  return Object.keys(obj).map((i) => obj[i]);
}

// Return JSX for a provided array of links
// this might need editing as well
export function renderLinks(links) {
  return <div className="other-links" />;
}

// Return JSX of a timeline
// might need to add an open date and close date to job and scholarship edit sections on admin pg
export function renderTimeline(t) {
  return (
    <div className="timeline-container">
      <h4 className="event-start-time">
        {t?.openDate ? `Opens: ${isoDateToDateString(t.openDate)}` : "NOW OPEN"}
      </h4>
      {t?.closeDate ? (
        <h4 className="event-end-time">
          Closes: {isoDateToDateString(t.closeDate)}
        </h4>
      ) : null}
    </div>
  );
}

// Return JSX for an array of job-listings
// the else portions of these sections are never shown due to the if/else nature in the index functions
export function renderJobListings(listings, editable, openModal) {
  let uids = Object.keys(listings);
  return !!uids.length ? (
    <div className="opportunity-row flex-row carousel">
      {uids.map((uid) => {
        let l = listings[uid];
        return <JobListingCard key={uid} l={l} onClick={openModal} />;
      })}
    </div>
  ) : (
    <p>
      There are no current job listings available. Let our officer team know of
      any new opportunities by emailing&nbsp;
      <a className="fancy" href="mailto:texashacs@gmail.com">
        texashacs@gmail.com
      </a>
      , or check back again later!
    </p>
  );
}

// Return JSX for an array of events
export function renderEvents(events, editable, openModal) {
  let uids = Object.keys(events);
  return !!uids.length ? (
    <div className="opportunity-row flex-row carousel">
      {uids
        .map((uid) => events[uid])
        .sort((a, b) => {
          return new Date(b.startTime) - new Date(a.startTime);
        })
        .map((event) => {
          return <EventCard key={event.uid} e={event} onClick={openModal} />;
        })}
    </div>
  ) : (
    <p>
      There are no upcoming events. Please let us know if this seems incorrect
      by emailing&nbsp;
      <a className="fancy" href="mailto:texashacs@gmail.com">
        texashacs@gmail.com
      </a>
      , or check back again later!
    </p>
  );
}

// Return JSX for an array of scholarships
export function renderScholarships(scholarships, editable, openModal) {
  let uids = Object.keys(scholarships);
  return !!uids.length ? (
    <div className="opportunity-row flex-row carousel">
      {uids.map((uid) => {
        let s = scholarships[uid];
        return <ScholarshipCard key={uid} s={s} onClick={openModal} />;
      })}
    </div>
  ) : (
    <p>
      There are no scholarships that we are currently aware of. Let our officer
      team know of any new opportunities by emailing&nbsp;
      <a className="fancy" href="mailto:texashacs@gmail.com">
        texashacs@gmail.com
      </a>
      , or check back again later!
    </p>
  );
}

export function renderModalContent(content) {
  return (
    <div className="flex-row opportunity-content" key={content.uid}>
      <div className="image">
        <CroppedImage {...content.image} alt="opportunity-view" />
      </div>
      <div className="flex other-opportunity-content">
        <h1 className="title">{content.title}</h1>
        <span className="time">
          {renderStartAndEndDateTime(content.startTime, content.endTime)}
        </span>
        <p className="description">{content.description}</p>
        <div className="links flex-row button-container">
          <LinkButton to={content.rsvpLink} className="rsvp-link">
            RSVP
          </LinkButton>
          <LinkButton to={content.location} className="location link">
            Meeting Location
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
