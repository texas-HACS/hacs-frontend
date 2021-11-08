import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
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

function AdminPanel(props) {
  const [data, setData] = useState(props.data);
  const [uData, setUData] = useState(null);
  const [opps, setOpps] = useState(props.opportunities);
  const [uOpps, setUOpps] = useState(null);
  const [events, setEvents] = useState(null);

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
          data = { jobs: {}, scholarships: {} };
        }
        setOpps(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    events ?? EventAPI.list().then((data) => setEvents(data));
  }, [events]);

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
    <div className="form-group">
      <h2 className="form-group-title">Officers</h2>
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

  const rerenderEvents = () => setEvents(null);
  eventsEdit = (
    <div className="form-group">
      <h2 className="form-group-title">Events</h2>
      {events
        ? Object.keys(events)
            .map((uid) => events[uid])
            .sort((a, b) => {
              // Sort in descending order of date
              return new Date(b.startTime) - new Date(a.startTime);
            })
            .map((event) => (
              <EventEdit
                id={event.uid}
                key={event.uid}
                data={event}
                user={props.user}
                handleUpdate={rerenderEvents}
              />
            ))
        : null}
      <EventEdit addNew user={props.user} handleUpdate={rerenderEvents} />
    </div>
  );

  if (opps) {
    jobsEdit = (
      <div className="form-group">
        <h2 className="form-group-title">Job Postings</h2>
        {opps.jobs
          ? Object.keys(opps.jobs).map((uid) => (
              <JobEdit
                id={uid}
                key={uid}
                data={opps.jobs[uid]}
                handleUpdate={updateOpp}
                handleDelete={deleteOpp}
              />
            ))
          : null}
        <JobEdit
          addNew
          data={{}}
          handleUpdate={updateOpp}
          handleDelete={deleteOpp}
        />
      </div>
    );

    scholarshipsEdit = (
      <div className="form-group">
        <h2 className="form-group-title">Scholarship Opportunities</h2>
        {opps.scholarships
          ? Object.keys(opps.scholarships).map((uid) => (
              <ScholarshipEdit
                id={uid}
                key={uid}
                data={opps.scholarships[uid]}
                handleUpdate={updateOpp}
                handleDelete={deleteOpp}
              />
            ))
          : null}
        <ScholarshipEdit
          addNew
          data={{}}
          handleUpdate={updateOpp}
          handleDelete={deleteOpp}
        />
      </div>
    );
  } else {
    console.log("This is not supposed to happen...");
  }

  return (
    <div className="admin-panel">
      {meetingLinkEdit}
      {signInLinkEdit}
      {/* TODO: Add ability to drag and drop ordering to enforce indices. */}
      {officersEdit}
      {memberOfTheWeekEdit}
      <div className="flex-row">
        {eventsEdit}
        {jobsEdit}
        {scholarshipsEdit}
      </div>
      <button
        className="btn btn-primary" /* onClick={ TODO: Implement db update } */
      >
        Update
      </button>
      <button className="btn btn-primary" onClick={submitSignout}>
        Sign Out
      </button>
    </div>
  );
}

export default AdminPanel;
