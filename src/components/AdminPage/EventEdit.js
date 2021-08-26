import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "./AdminPage.scss";

const updateInDB = (data) => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      fetch("http://localhost:5000/opportunities/", {
        method: "POST", // or 'PUT'
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify(data),
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function EventEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? new Date().getTime(),
  });

  const editSection = (
    <div className="admin-edit">
      <form>
        <label>Event Title</label>
        <input
          id="event-title-edit"
          className="form-control-small"
          name="name"
          defaultValue={data?.name}
          placeholder="ex.: Diversity Networking Event"
          required
          onChange={handleChange}
        />
        <label>Start Time</label>
        <input
          id="event-start-time-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>End Time</label>
        <input
          id="event-end-time-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          id="event-image-url-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>Meeting Link</label>
        <input
          id="event-meeting-link-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>RSVP Link</label>
        <input
          id="event-rsvp-link-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>Event Location</label>
        <input
          id="event-location-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>Event Description</label>
        <input
          id="event-description-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>Other Links</label>
        <input
          id="event-other-links-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
      </form>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(editing ^ true)}>
      <p className="editable">
        {props.data?.name == null ? (
          "Add Event"
        ) : (
          <span>
            {props.data?.name} -
            <span className="subtitle">{props.data?.role}</span>
          </span>
        )}
      </p>
      {/* TODO: Add X mark to close dropdown */}
    </div>
  );

  return (
    <div className="editable-group">
      {saveSection}
      {!!editing && editSection}
    </div>
  );
}

// const OpportunitiesEdit = forwardRef((props, ref) => {
//   const [data, updateData] = useState({});
//   const [eventUpdates, setEventUpdates] = useState(null);
//   const [jobUpdates, setJobUpdates] = useState(null);
//   const [scholarshipUpdates, setScholarshipUpdates] = useState(null);
//   const inputData = useRef(null);
//   const refs = [inputData];

//   useImperativeHandle(ref, () => ({
//     update() {
//       // var updates = {
//       //   events: updateEvents(),
//       //   scholarships: updateScholarships(),
//       //   jobs: updateJobs(),
//       // };
//       // value.data = inputData.current.value;
//       // updateData(value);
//       // updateInDB(value);
//     },
//   }));

//   // an initial api call to get our member of the week
//   useEffect(() => {
//     firebase
//       .auth()
//       .currentUser.getIdToken(/* forceRefresh */ true)
//       .then((idToken) => {
//         fetch("https://enigmatic-shore-29691.herokuapp.com/opportunities", {
//           headers: { Authorization: idToken },
//         });
//       })
//       .then((res) => {
//         updateData(res.json);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);

//   return (
//     <div className="opportunitiesEdit">
//       <input
//         // ref={inputEvents}
//         type="text"
//         className="form-control"
//         id="eventsInput"
//         placeholder="Enter JSON for events"
//         defaultValue={props.data}
//         onChange={setEventUpdates(this.value)}
//       />
//       <input
//         // ref={inputScholarships}
//         type="text"
//         className="form-control"
//         id="scholarshipsInput"
//         placeholder="Enter JSON for scholarships"
//         defaultValue={props.data}
//         onChange={setScholarshipUpdates(this.value)}
//       />
//       <input
//         // ref={inputJobs}
//         type="text"
//         className="form-control"
//         id="jobsInput"
//         placeholder="Enter JSON for jobs"
//         defaultValue={props.data}
//         onChange={setJobUpdates(this.value)}
//       />
//     </div>
//   );
// });

export default EventEdit;
