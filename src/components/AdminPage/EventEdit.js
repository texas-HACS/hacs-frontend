import React, { Fragment, useState } from "react";
import "./AdminPage.scss";
import Datetime from "react-datetime";
import FileEdit from "../MediaManagement/FileEdit";
import EventAPI from "../../api/event";
import ImageEdit from "../MediaManagement/ImageEdit";

const DEFAULT_GCAL_STATES = { confirmed: true, potential: false };

function EventEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(props.data);
  const { addNew, user } = props;

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

  const editSection = (
    <div className="admin-edit">
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
      <div>Image</div>
      <ImageEdit
        key={"image_edit" + props.id}
        {...data?.image}
        onConfirm={(img) => changeData("image", img)}
        onRemoveImage={() => changeData("image", null)}
      />
      <label>Meeting Link</label>
      <input
        id="event-meeting-link-edit"
        className="form-control-small"
        name="meetingLink"
        defaultValue={data?.meetingLink}
        placeholder="ex.: https://utexas.zoom.us/j/..."
        onChange={handleChange}
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
      <button className="btn btn-primary" onClick={handleDelete} type="button">
        {addNew ? "Cancel" : "Delete"}
      </button>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(!!(editing ^ true))}>
      <p className="editable">
        {addNew ? "Add Event" : <span>{props.data?.title}</span>}
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

export default EventEdit;
