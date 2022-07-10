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
            src="https://calendar.google.com/calendar/embed?height=800&wkst=1&bgcolor=%234285F4&ctz=America%2FChicago&src=dGV4YXNoYWNzQGdtYWlsLmNvbQ&src=YWxlbG5lZmpkamwzbDlqbGQzdWI1ODAyZzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ODdqZnRpOGtha2JkcHI3MzRxYXV0NGw5cWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cDM4ODBrNjdnYjM4NzJ0dGEycnFnZXYxcmtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23bc7800&color=%23E67C73&color=%23039BE5&color=%239f00cc&color=%233F51B5"
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
            src="https://calendar.google.com/calendar/embed?height=800&wkst=1&bgcolor=%234285F4&ctz=America%2FChicago&src=dGV4YXNoYWNzQGdtYWlsLmNvbQ&src=YWxlbG5lZmpkamwzbDlqbGQzdWI1ODAyZzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ODdqZnRpOGtha2JkcHI3MzRxYXV0NGw5cWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cDM4ODBrNjdnYjM4NzJ0dGEycnFnZXYxcmtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23bc7800&color=%23E67C73&color=%23039BE5&color=%239f00cc&color=%233F51B5"
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
