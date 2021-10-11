import React from "react";
import "./Homepage.scss";
import OfficerCard from "../partials/OfficerCard";
import Fade from "react-reveal/Fade";

function Leadership(props) {
  var officers = props.officers;
  return (
    <section className="leadership">
      <div className="container">
        <h1>Leadership</h1>
        <div className="leadership-wrapper">
          {Object.keys(officers)
            .sort((a_uid, b_uid) => {
              return officers[a_uid].order > officers[b_uid].order ? 1 : -1;
            })
            .map((uid) => {
              let officer = officers[uid];
              return (
                <Fade bottom key={uid}>
                  <OfficerCard {...officer} />
                </Fade>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Leadership;
