import React, { useEffect, useState } from "react";
import config from "../../_config";
import "./Homepage.scss";
import Fade from "react-reveal/Fade";

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

  console.log(events);

  const today = new Date();
  const dates = [
    today,
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
  ];
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

  const validEvents = events.filter((event) => {
    return event.startTime >= today && event.startTime <= limit;
  });

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
