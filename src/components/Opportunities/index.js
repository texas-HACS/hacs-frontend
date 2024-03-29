import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import EventAPI from "../../api/event";
import JobAPI from "../../api/job";
import ScholarshipAPI from "../../api/scholarship";
import {
  renderEvents,
  renderJobListings,
  renderScholarships,
  renderModalContent,
} from "./utils.js";
import Modal from "../partials/Modal";

function Opportunities(props) {
  const [data, setData] = useState({});
  const [events, setEvents] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [scholarships, setScholarships] = useState(null);

  useEffect(() => {
    EventAPI.list().then((e) => setEvents(e));
  }, []);

  useEffect(() => {
    JobAPI.list().then((j) => setJobs(j));
  }, []);

  useEffect(() => {
    ScholarshipAPI.list().then((s) => setScholarships(s));
  }, []);

  useEffect(() => {
    setData(props.opportunities);
  }, [props.opportunities]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(
    "Something is wrong, no data in the modal..."
  );

  // check what this does
  useEffect(() => {}, [modalOpen, modalContent]);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const jobsSection = jobs ? (
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
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {renderModalContent(modalContent)}
      </Modal>
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
      {jobsSection}
      {scholarshipsSection}
      {modal}
    </div>
  );
}

export default Opportunities;
