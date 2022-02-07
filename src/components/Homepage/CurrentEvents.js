import React, { useEffect, useState } from "react";
import config from "../../_config";
import "./Homepage.scss";
import Fade from "react-reveal/Fade";
import EventCard from "../Opportunities/EventCard"

function CurrentEvents(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(config.url + "/events", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(Object.keys(data).map((uid) => data[uid]));
      })
      .catch((error) => {
        setEvents([]);
        console.error("Error:", error);
      });
  }, []);

  const today = new Date();

  const limit = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );

  // Check if the first event hasn't "loaded" in yet, and if it hasn't, log the event startTime
  const event1 = events[0];
  if(event1 != null) {
    console.log(event1.startTime);
   // const testStart = new Date(event1.startTime);
  }
  console.log(events);
  const validEvents = events.filter((event) => {
    const date = new Date(event.startTime);
    if(date >= today && date <= limit) {
      console.log(true);
      return event;
    }
  });

  var renderedEvents = validEvents.map((event) => {
    return <EventCard data={event}></EventCard>
  });

  return (
    <section className="current-events">
      <div className="content-wrapper">
        <Fade bottom>
          <h3 className="seciton-title">Current Events</h3>
        </Fade>
        <div className="event-slider">
          {renderedEvents}
        </div>
      </div>
    </section>
  );
}

export default CurrentEvents;
