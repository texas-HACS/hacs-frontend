import React, { useEffect, useState } from "react";
import config from "../../_config";
import OfficerEdit from "./OfficerEdit";
import MeetingLinkEdit from "./MeetingLinkEdit";
import MemberOfTheWeekEdit from "./MemberOfTheWeekEdit";
import EventEdit from "./EventEdit";
import JobEdit from "./JobEdit";
import ScholarshipEdit from "./ScholarshipEdit";
import SignInLinkEdit from "./SignInLinkEdit";
import useEffectNoInitialRender from "../../hooks/useEffectNoInitialRender";
import EventAPI from "../../api/event";
import JobAPI from "../../api/job";
import QRCodeManager from "../QRCode/QRCodeManager";
import ScholarshipAPI from "../../api/scholarship";

function AdminPanel(props) {
  const [data, setData] = useState(props.data);
  const [uData, setUData] = useState(null);
  const [opps, setOpps] = useState(props.opportunities);
  const [uOpps, setUOpps] = useState(null);
  const [events, setEvents] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [scholarships, setScholarships] = useState(null);

  useEffect(() => {
    fetch(config.url + "/siteContent", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(config.url + "/opportunities", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          data = { jobs: {} };
        }
        setOpps(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    events ?? EventAPI.list().then((eData) => setEvents(eData));
  }, []);

  useEffect(() => {
    jobs ?? JobAPI.list().then((jData) => setJobs(jData));
  }, []);

  useEffect(() => {
    scholarships ??
      ScholarshipAPI.list().then((sData) => setScholarships(sData));
  }, []);

  useEffectNoInitialRender(() => {
    if (uData == null) {
      return;
    }

    props.user
      .getIdToken(true)
      .then((idToken) => {
        fetch(config.url + "/siteContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify(uData),
        });
      })
      .then(() => {
        setUData(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [uData]);

  useEffectNoInitialRender(() => {
    if (uOpps == null) {
      return;
    }

    props.user
      .getIdToken(true)
      .then((idToken) => {
        fetch(config.url + "/opportunities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify(uOpps),
        });
      })
      .then(() => {
        setUOpps(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [uOpps]);

  const updateOfficer = (officerData) => {
    let updating = { ...data };
    updating.officers[officerData.uid] = officerData;
    setData(updating);
    setUData(updating);
  };

  const deleteOfficer = (uid) => {
    let updating = { ...data };
    if (updating.officers?.[uid] != null) {
      delete updating.officers[uid];
    }
    setData(updating);
    setUData(updating);
  };

  const updateMeetingLink = (linkData) => {
    let updating = { ...data };
    updating.redirects.meetingLink = linkData;
    setData(updating);
    setUData(updating);
  };

  const updateSignInLink = (linkData) => {
    let updating = { ...data };
    updating.redirects.signInLink = linkData;
    setData(updating);
    setUData(updating);
  };

  const updateMemberOfTheWeek = (linkData) => {
    let updating = { ...data };
    updating.memberOfTheWeek = linkData;
    setData(updating);
    setUData(updating);
  };

  const updateOpp = (oppType, oppData) => {
    let updating = { ...opps };
    if (!updating[oppType]) {
      updating[oppType] = {};
    }
    updating[oppType][oppData.uid] = oppData;
    setOpps(updating);
    setUOpps(updating);
  };

  const deleteOpp = (oppType, uid) => {
    let updating = { ...opps };
    if (updating[oppType]?.[uid] != null) {
      delete updating[oppType][uid];
    }
    setOpps(updating);
    setUOpps(updating);
  };

  const submitSignout = () => {
    props.signoutUser();
  };

  const meetingLinkEdit =
    data.redirects.meetingLink !== undefined ? (
      <MeetingLinkEdit
        data={data.redirects.meetingLink}
        handleUpdate={updateMeetingLink}
      />
    ) : null;

  const signInLinkEdit =
    data.redirects.signInLink !== undefined ? (
      <SignInLinkEdit
        data={data.redirects.signInLink}
        handleUpdate={updateSignInLink}
      />
    ) : null;

  const officersEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Officers</h2>
      {data.officers !== undefined
        ? Object.keys(data.officers)
            ?.sort((a_uid, b_uid) => {
              return data.officers[a_uid].order > data.officers[b_uid].order
                ? 1
                : -1;
            })
            .map((uid) => (
              <OfficerEdit
                id={uid}
                key={uid}
                data={data.officers[uid]}
                handleUpdate={updateOfficer}
                handleDelete={deleteOfficer}
              />
            ))
        : null}
      <OfficerEdit
        addNew
        handleUpdate={updateOfficer}
        handleDelete={deleteOfficer}
        data={{}}
      />
    </div>
  );

  const memberOfTheWeekEdit =
    data.memberOfTheWeek !== undefined ? (
      <MemberOfTheWeekEdit
        data={data.memberOfTheWeek}
        handleUpdate={updateMemberOfTheWeek}
      />
    ) : null;

  var eventsEdit, jobsEdit, scholarshipsEdit;

  const rerenderEvents = (data) => setEvents({ ...events, [data.uid]: data });
  const deleteEvent = (uid) => {
    let updatedEvents = { ...events };
    delete updatedEvents[uid];
    setEvents(updatedEvents);
  };
  eventsEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Events</h2>
      {events
        ? Object.keys(events)
            .map((uid) => events[uid])
            .sort((a, b) => {
              // Sort in descending order of date
              return new Date(b.startTime) - new Date(a.startTime);
            })
            .map((e) => (
              <EventEdit
                id={e.uid}
                key={e.uid}
                data={e}
                user={props.user}
                handleUpdate={rerenderEvents}
                handleDelete={deleteEvent}
              />
            ))
        : null}
      <EventEdit addNew user={props.user} handleUpdate={rerenderEvents} />
    </div>
  );

  const rerenderScholarhsips = (data) =>
    setScholarships({ ...scholarships, [data.uid]: data });
  const deleteScholarship = (uid) => {
    let updatedScholarships = { ...scholarships };
    delete updatedScholarships[uid];
    setScholarships(updatedScholarships);
  };
  scholarshipsEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Scholarship Opportunities</h2>
      {scholarships
        ? Object.keys(scholarships)
            .map((uid) => scholarships[uid])
            .sort((a, b) => {
              return new Date(b.startTime) - new Date(a.startTime);
            })
            .map((s) => (
              <ScholarshipEdit
                id={s.uid}
                key={s.uid}
                data={s}
                user={props.user}
                handleUpdate={rerenderScholarhsips}
                handleDelete={deleteScholarship}
              />
            ))
        : null}
      <ScholarshipEdit
        addNew
        user={props.user}
        handleUpdate={rerenderScholarhsips}
      />
    </div>
  );

  const rerenderJobs = (data) => setJobs({ ...jobs, [data.uid]: data });
  const deleteJob = (uid) => {
    let updatedJobs = { ...jobs };
    delete updatedJobs[uid];
    setJobs(updatedJobs);
  };
  jobsEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Job Postings</h2>
      {jobs
        ? Object.keys(jobs)
            .map((uid) => jobs[uid])
            .sort((a, b) => {
              return new Date(b.startTime) - new Date(a.startTime);
            })
            .map((j) => (
              <JobEdit
                id={j.uid}
                key={j.uid}
                data={j}
                user={props.user}
                handleUpdate={rerenderJobs}
                handleDelete={deleteJob}
              />
            ))
        : null}
      <JobEdit addNew user={props.user} handleUpdate={rerenderJobs} />
    </div>
  );

  return (
    <div className="admin-panel">
      {meetingLinkEdit}
      {signInLinkEdit}
      {/* TODO: Add ability to drag and drop ordering to enforce indices. */}
      {officersEdit}
      {memberOfTheWeekEdit}
      <div className="opportunities-edit flex-row">
        {eventsEdit}
        {jobsEdit}
        {scholarshipsEdit}
      </div>
      <div className="button-container flex-row">
        <button className="btn btn-primary" onClick={submitSignout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
