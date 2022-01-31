import React, { useEffect, useState } from "react";
import config from "../../_config";
import "./Homepage.scss";
import Fade from "react-reveal/Fade";
import EventCard from "./Opportunities.EventCard.js"

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

  // Here is an array of all events, printed to the console for you to see their structure
  // You will want to pay attention to the event.startTime value
/*
  const today = new Date("August 31, 2021 03:24:00");
  const dates = [
    today,
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
  ];
  */
  const limit = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );

  // Filter the dates to get the valid date
  // A date is valid iff it is between the current date, and the current date + 7 inclusive
  const validDates = dates.filter((date) => {
    return date >= today && date <= limit;
  });

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

  for(let i = 0; i < validEvents.length; i++) {
    // make an EventCard for each event here and store in array "events"
  }

  console.log(validEvents);

  return (
    <section className="current-events">
      <div className="content-wrapper">
        <Fade bottom>
          <h3 className="seciton-title">Current Events</h3>
        </Fade>
        <div className="event-slider">
          {/* Here I want to feed in the next 7 days events into the EventCard,
          and somehow add these instances of EventCard into a slider. */}
        </div>
      </div>
    </section>
  );
}

export default CurrentEvents;
