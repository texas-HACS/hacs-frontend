import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import "./Opportunities.scss";
import {
  renderEvents,
  renderJobListings,
  renderScholarships,
} from "./utils.js";
import HACSModal from "../partials/Modal";

function Opportunities(props) {
  const [data, setData] = useState({ events: {}, jobs: {}, scholarships: {} });

  useEffect(() => {
    setData(props.opportunities);
  }, [props.opportunities]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(
    "This shouldn't be happening..."
  );

  const openModal = (content) => {
    setModalContent(content.title);
    setModalOpen(!modalOpen);
  };

  // an initial api call to get all opportunities data
  if (!data) {
    return <div />;
  }

  var { jobs, events, scholarships } = data;

  // events = placeholderEvents;
  // scholarships = placeholderSponsorScholarships;
  // jobs = placeholderSponsorListings;

  const eventsSection = events ? (
    <div className="corporate-events">
      <Fade bottom>
        <h3 className="section-title">Events</h3>
      </Fade>
      <Fade right>{renderEvents(events, props.editable, openModal)}</Fade>
    </div>
  ) : (
    <div />
  );

  const jobListingsSection = jobs ? (
    <div className="job-listings">
      <Fade bottom>
        <h3 className="section-title">Job Listings</h3>
      </Fade>
      <Fade left>{renderJobListings(jobs, props.editable, openModal)}</Fade>
    </div>
  ) : (
    <div />
  );

  const scholarshipsSection = scholarships ? (
    <div className="scholarships">
      <Fade bottom>
        <h3 className="section-title">Scholarships</h3>
      </Fade>
      <Fade left>
        {renderScholarships(scholarships, props.editable, openModal)}
      </Fade>
    </div>
  ) : (
    <div />
  );

  const modal = (
    <div>
      <HACSModal isOpen={modalOpen}>{modalContent}</HACSModal>
    </div>
  );

  return (
    <div className="opportunities">
      <Fade>
        <section>
          <h1>Opportunities</h1>
          <p className="description">
            We will post as many amazing opportunities here as we can! These
            include scholarships, events, programs, and job listings for our
            membership! If you find any more opportunities we should add, please
            reach out to our officer team by emailing{" "}
            <a className="fancy" href="mailto:texashacs@gmail.com">
              texashacs@gmail.com
            </a>
            .
          </p>
        </section>
      </Fade>
      {eventsSection}
      {jobListingsSection}
      {scholarshipsSection}
      {modal}
    </div>
  );
}

export default Opportunities;
