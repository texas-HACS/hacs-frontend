import React from "react";
import { isoDateToDateTimeString, isoDateToDateString } from "../utils/utils";
import Modal from "../partials/Modal";

// Return array from firestore object representation of array
function objectToArray(obj) {
  return Object.keys(obj).map((i) => obj[i]);
}

// Return JSX for a provided array of links
function renderLinks(links) {
  return <div className="other-links" />;
}

// Return JSX of a timeline
function renderTimeline(t) {
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
    <div className="sponsor-listings flex-row carousel">
      {uids.map((uid) => {
        let l = listings[uid];

        return (
          <div
            className="job-listing-container opportunity flex card"
            key={uid}
            onClick={() => openModal(l)}
          >
            {l.img ? (
              <img
                src={l.img}
                className="scholarship-image"
                alt="scholarship-view"
              />
            ) : null}
            <div className="details">
              <h3 className="title">{l.title}</h3>
              <div className="job-timeline-container">
                {renderTimeline(l.timeline)}
              </div>
              <a href={l.link} className="job-link">
                <button>Visit Site</button>
              </a>
              <div className="other-links-container">
                {renderLinks(l.otherLinks)}
              </div>
            </div>
          </div>
        );
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
    <div className="sponsor-events flex-row carousel">
      {uids.map((uid) => {
        let e = events[uid];
        return (
          <div
            className="event-container opportunity flex card"
            key={uid}
            onClick={() => openModal(e)}
          >
            {e.img ? (
              <img src={e.img} className="event-image" alt="event-view" />
            ) : null}
            <div className="details">
              <h3 className="title">{e.title}</h3>
              <div className="event-time-container">
                <h4 className="event-start-time">
                  {isoDateToDateTimeString(e.startTime)}
                </h4>
                <h4 className="event-end-time">
                  {isoDateToDateTimeString(e.endTime)}
                </h4>
              </div>
              <div className="event-links-container flex-row">
                <a href={e.rsvpLink} className="rsvp-link">
                  <button>RSVP</button>
                </a>
                <a href={e.meetingLink} className="meeting-link">
                  <button>JOIN</button>
                </a>
              </div>
            </div>
          </div>
        );
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
    <div className="sponsor-scholarships flex-row carousel">
      {uids.map((uid) => {
        let s = scholarships[uid];
        return (
          <div
            key={uid}
            className="scholarship-container opportunity flex card"
            onClick={() => openModal(s)}
          >
            {s.img ? (
              <img
                src={s.img}
                className="scholarship-image"
                alt="scholarship-view"
              />
            ) : null}
            <div className="details">
              <h3 className="title">{s.title}</h3>
              <a href={s.link} className="scholarship-link">
                <button>Visit Site</button>
              </a>
              <div className="scholarship-timeline-container">
                {renderTimeline(s.timeline)}
              </div>
            </div>
          </div>
        );
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
