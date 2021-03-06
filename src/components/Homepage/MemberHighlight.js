import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";

function MemberHighlight(props) {
  return (
    <section className="member-highlight">
      {props.member && (
        <Fragment>
          <Fade bottom>
            <h3 className="section-title">Member of the Week</h3>
          </Fade>
          <Fade bottom>
            <div className="member-container flex-row">
              <a href={props.member.linkedin}>
                <img
                  src={props.member.image?.url}
                  alt={"HACS member of the week, " + props.member.name}
                />
              </a>
              <div className="content">
                <p className="name">{props.member.name}</p>
                <p className="description">{props.member.description}</p>
                <a href={props.member.linkedin} className="link">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </Fade>
        </Fragment>
      )}
    </section>
  );
}

export default MemberHighlight;
