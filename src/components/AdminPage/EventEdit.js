import React, { useState } from "react";
import "./AdminPage.scss";
import { newUid } from "../utils/utils";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";

function EventEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data.uid ?? newUid("event"),
  });

  const handleSave = (e) => {
    e.preventDefault()
    props.handleUpdate("events", data);
    setEditing(false);
    if (props.addNew) {
      setData({ uid: newUid("event") });
    }
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    let newData = { ...data };
    value = type === "number" ? parseInt(value, 10) : value;
    newData[name] = value;
    setData(newData);
  };

  const handleDateChange = (name, date) => {
    handleChange({
      target: { name: name, value: new Date(date).toISOString() },
    });
  };

  const handleDelete = () => {
    props.handleDelete("events", data.uid);
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit">
      <form id={data.uid} onSubmit={handleSave}>
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
        <Flatpickr
          data-enable-time
          value={data?.startTime ?? new Date()}
          onChange={(date) => handleDateChange("startTime", date)}
        />
        <label>End Time</label>
        <Flatpickr
          data-enable-time
          value={data?.endTime ?? new Date()}
          onChange={(date) => handleDateChange("endTime", date)}
        />
        <label>Image URL</label>
        <input
          id="event-image-url-edit"
          className="form-control-small"
          name="imageUrl"
          defaultValue={data?.img}
          placeholder="ex.: https://firebasestorage.googleapis.com/..."
          onChange={handleChange}
        />
        <label>Meeting Link</label>
        <input
          id="event-meeting-link-edit"
          className="form-control-small"
          name="meetingLink"
          defaultValue={data?.meetingLink}
          placeholder="ex.: https://utexas.zoom.us/j/..."
          required
          onChange={handleChange}
        />
        <label>RSVP Link</label>
        <input
          id="event-rsvp-link-edit"
          className="form-control-small"
          name="rsvpLink"
          defaultValue={data?.rsvpLink}
          placeholder="ex.: https://forms.gle/..."
          required
          onChange={handleChange}
        />
        <label>Event Location</label>
        <input
          id="event-location-edit"
          className="form-control-small"
          name="location"
          defaultValue={data?.location}
          placeholder="ex.: GDC 5.302"
          required
          onChange={handleChange}
        />
        <label>Other Links</label>
        <input
          id="event-other-links-edit"
          className="form-control-small"
          name="otherLinks"
          defaultValue={data?.otherLinks}
          placeholder="ex.: flyer link, merch sign up, etc."
          required
          readonly // TODO: Fix render before removing this tag
          onChange={handleChange}
        />
        <label>Event UID</label>
        <input
          id="event-uid-edit"
          className="form-control-small"
          name="uid"
          value={data?.uid ?? newUid("event")}
          required
          readOnly
          onChange={handleChange}
        />
      </form>
      <button className="btn btn-primary" type="submit" form={data.uid}>
        Save
      </button>
      <button className="btn btn-primary" onClick={handleDelete} type="button">
        Delete
      </button>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(editing ^ true)}>
      <p className="editable">
        {props.data?.title == null ? (
          "Add Event"
        ) : (
          <span>{props.data?.title}</span>
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

export default EventEdit;
