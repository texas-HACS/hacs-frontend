import { auth } from "../../_firebase";
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

function AdminPanel(props) {
  const [data, setData] = useState(props.data);
  const [uData, setUData] = useState(null);
  const [opps, setOpps] = useState(props.opportunities);
  const [uOpps, setUOpps] = useState(null);

  useEffect(() => {
    if (auth.currentUser == null || uData == null) {
      return;
    }

    auth.currentUser
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

  useEffect(() => {
    if (auth.currentUser == null || uOpps == null) {
      return;
    }

    auth.currentUser
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
  if (opps) {
    eventsEdit = (
      <div className="form-group">
        <h2 className="form-group-title">Events</h2>
        {opps.events
          ? Object.keys(opps.events)
              .map((uid) => opps.events[uid])
              .sort((a, b) => {
                // Sort in descending order of date
                return new Date(b.startTime) - new Date(a.startTime);
              })
              .map((event) => (
                <EventEdit
                  id={event.uid}
                  key={event.uid}
                  data={event}
                  handleUpdate={updateOpp}
                  handleDelete={deleteOpp}
                />
              ))
          : null}
        <EventEdit
          addNew
          data={{}}
          handleUpdate={updateOpp}
          handleDelete={deleteOpp}
        />
      </div>
    );

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
