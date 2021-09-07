import React from "react";
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
  "https://firebasestorage.googleapis.com/v0/b/hacs-opensource.appspot.com/o/hacs_logo.png?alt=media&token=993e859b-5ae1-47c3-9f51-cf414d833a2c";

// Return array from firestore object representation of array
function objectToArray(obj) {
  return Object.keys(obj).map((i) => obj[i]);
}

// Return JSX for a provided array of links
export function renderLinks(links) {
  return <div className="other-links" />;
}

// Return JSX of a timeline
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
      any new opportunities by emailing
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
      {uids.map((uid) => {
        let e = events[uid];
        return <EventCard key={uid} e={e} onClick={openModal} />;
      })}
    </div>
  ) : (
    <p>
      There are no upcoming events. Please let us know if this seems incorrect
      by emailing
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
      team know of any new opportunities by emailing
      <a className="fancy" href="mailto:texashacs@gmail.com">
        texashacs@gmail.com
      </a>
      , or check back again later!
    </p>
  );
}

export function renderModalContent(content) {
  return (
    <div className="flex-row content" key={content.uid}>
      <div className="image">
        <img src={content.imageUrl ?? HACS_LOGO_URL} />
      </div>
      <div className="flex other-content">
        <h1 className="title">{content.title}</h1>
        <span className="time">
          {renderStartAndEndDateTime(content.startTime, content.endTime)}
        </span>
        <p className="description">{content.description}</p>
        <div className="links flex-row">
          <LinkButton to={content.meetingLink} className="meeting link">
            Join Meeting
          </LinkButton>
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
