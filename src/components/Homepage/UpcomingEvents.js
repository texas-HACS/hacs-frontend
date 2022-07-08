import React from "react";
import Fade from "react-reveal/Fade";

function UpcomingEvents(props) {
  return (
    <section className="upcoming-events flex">
      <Fade bottom>
        <div className="align-left">
          <h3 className="section-title">Upcoming Events</h3>
        </div>
      </Fade>
      <Fade>
        <div className="calendar-wrapper flex">
          <iframe
            src="https://hacs-server.herokuapp.com/calendar"
            style={{
              border: 0,
              height: "600px",
              background: "none",
              width: "100%",
            }}
            frameBorder="0"
            id="calendar"
            title="HACS Calendar"
          ></iframe>
          <iframe
            src="https://hacs-server.herokuapp.com/calendar?agenda=true"
            style={{
              border: 0,
              height: "400px",
              background: "none",
            }}
            frameBorder="0"
            id="calendar-mobile"
            title="HACS Calendar"
          ></iframe>
        </div>
      </Fade>
    </section>
  );
}

export default UpcomingEvents;
