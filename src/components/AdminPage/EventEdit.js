import React, { Fragment, useState } from "react";
import Datetime from "react-datetime";
import EventAPI from "../../api/event";
import ImageEdit from "../MediaManagement/ImageEdit";

// for google calendar functionality
const DEFAULT_GCAL_STATES = { confirmed: true, potential: false };

function EventEdit(props) {
  const [editing, setEditing] = useState(false); // used to show or hide edit options
  const [data, setData] = useState(props.data);
  const { addNew, user } = props;

  // saves and updates the data on the backend then the frontend
  const handleSave = () => {
    const gCal = data?.gCal ?? DEFAULT_GCAL_STATES;
    const savedData = { ...data, gCal };
    (addNew
      ? EventAPI.create(user, savedData)
      : EventAPI.update(user, savedData.uid, savedData)
    ).then((resData) => (resData ? props.handleUpdate(resData) : null));
    if (addNew) {
      setData(null);
    }
    setEditing(false);
  };

  // changes in data are done by first being passed into the handleChange/handleDateChange/handleGCal...
  //function and then into the changeData function. At this point the changes are not saved yet.
  const changeData = (key, value) => {
    let newData = { ...data };
    newData[key] = value;
    setData(newData);
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    value = type === "number" ? parseInt(value, 10) : value;
    value = value === "" ? null : value;
    changeData(name, value);
  };

  const handleDateChange = (name, date) => {
    try {
      const value = new Date(date).toISOString();
      changeData(name, value);
    } catch (e) {
      console.log("Invalid date");
    }
  };

  const handleGCalStateChange = (e) => {
    let { name, checked } = e.target;
    const gCalState = data?.gCal
      ? { ...data.gCal }
      : { ...DEFAULT_GCAL_STATES };
    gCalState[name] = checked;
    changeData("gCal", gCalState);
  };

  const handleDelete = () => {
    addNew
      ? setData(null)
      : EventAPI.delete(user, data.uid).then(() =>
          props.handleDelete(data.uid)
        );
    setEditing(false);
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      handleDelete();
    } else {
      return;
    };
  }

  const editSection = (
    <div className="admin-edit form-wrapper">
      <label>Event Title</label>
      <input
        id="event-title-edit"
        className="form-control-small"
        name="title"
        defaultValue={data?.title}
        placeholder="ex.: Diversity Networking Event"
        required
        onChange={handleChange}
      />
      <label>Description</label>
      <textarea
        id="event-description-edit"
        className="form-control-small"
        name="description"
        defaultValue={data?.description}
        placeholder="Include all major details surrounding the event"
        required
        onChange={handleChange}
      />
      <label>Start Time</label>
      <Datetime
        className="small"
        value={new Date(data?.startTime)}
        onChange={(date) => {
          handleDateChange("startTime", date);
        }}
      />
      <label>End Time</label>
      <Datetime
        className="small"
        value={new Date(data?.endTime)}
        onChange={(date) => {
          handleDateChange("endTime", date);
        }}
      />
      <label>Image</label>
      <ImageEdit
        key={"image_edit" + props.id}
        {...data?.image}
        onConfirm={(img) => changeData("image", img)}
        onRemoveImage={() => changeData("image", null)}
      />
      <label>RSVP Link</label>
      <input
        id="event-rsvp-link-edit"
        className="form-control-small"
        name="rsvpLink"
        defaultValue={data?.rsvpLink}
        placeholder="ex.: https://forms.gle/..."
        onChange={handleChange}
      />
      <label>Event Location</label>
      <input
        id="event-location-edit"
        className="form-control-small"
        name="location"
        defaultValue={data?.location}
        placeholder="ex.: GDC 5.302"
        onChange={handleChange}
      />
      <label>Other Links</label>
      <input
        id="event-other-links-edit"
        className="form-control-small"
        name="otherLinks"
        defaultValue={data?.otherLinks}
        placeholder="ex.: flyer link, merch sign up, etc."
        readOnly // TODO: Fix render before removing this tag
        onChange={handleChange}
      />
      <label>Enable Google Calendar</label>
      <div className="calendar-options flex-row">
        <input
          id="potential-calendar"
          type="checkbox"
          name="potential"
          checked={data?.gCal ? data.gCal.potential : false}
          onChange={handleGCalStateChange}
        />
        <label htmlFor="potential-calendar">Potential Events</label>
        <input
          id="hacs-calendar"
          type="checkbox"
          name="confirmed"
          checked={data?.gCal ? data.gCal.confirmed : true}
          onChange={handleGCalStateChange}
        />
        <label htmlFor="hacs-calendar">HACS Calendar</label>
      </div>
      {addNew ? null : (
        <Fragment>
          <label>Event UID</label>
          <input
            id="event-uid-edit"
            className="form-control-small"
            name="uid"
            value={data.uid}
            required
            readOnly
          />
        </Fragment>
      )}
      <button className="btn btn-primary" onClick={handleSave}>
        {addNew ? "Create" : "Save"}
      </button>
      <button className="btn btn-primary" onClick={confirmDelete} type="button">
        {addNew ? "Cancel" : "Delete"}
      </button>
    </div>
  );

  // setting up the element for the event that is always viewable
  const saveSection = (
    <div onClick={() => setEditing(!!(editing ^ true))}>
      <p className="editable">
        {addNew ? "Add Event" : <span>{props.data?.title}</span>}
      </p>
      {/* TODO: Add X mark to close dropdown */}
    </div>
  );

  // This will return the structure of an editable event on the admin page
  // the edit section will be hidden if !!editing is false and will be shown when it's true.
  return (
    <div className="editable-group">
      {saveSection}
      {!!editing && editSection}
    </div>
  );
}

export default EventEdit;
