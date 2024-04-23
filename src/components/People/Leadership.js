import React from "react";
import OfficerCard from "../partials/OfficerCard";
import Fade from "react-reveal/Fade";

function Leadership(props) {
  var officers = props.officers;
  return (
    <section className="leadership">
        <h3 className="section-title">Leadership</h3>
        <div className="leadership-wrapper">
          {Object.keys(officers)
            .sort((a_uid, b_uid) => {
              return officers[a_uid].order - officers[b_uid].order;
            })
            .map((uid) => {
              let officer = officers[uid];
              return (
                <OfficerCard {...officer} />
              );
            })}
        </div>
    </section>
  );
}

export default Leadership;
