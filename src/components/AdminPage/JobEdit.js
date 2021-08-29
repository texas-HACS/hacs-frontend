import React, { useState } from "react";
import "./AdminPage.scss";
import { newUid } from "../utils/utils";

function JobEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? newUid("job"),
  });

  const handleSave = (e) => {
    e.preventDefault();
    props.handleUpdate("jobs", data);
    setEditing(false);
    if (props.addNew) {
      setData({ uid: newUid("job") });
    }
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    let newData = { ...data };
    value = type === "number" ? parseInt(value, 10) : value;
    newData[name] = value;
    setData(newData);
  };

  const handleDelete = () => {
    props.handleDelete("jobs", data.uid);
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit">
      <form id={data.uid} onSubmit={handleSave}>
        <label>Job Title</label>
        <input
          id="job-title-edit"
          className="form-control-small"
          name="title"
          defaultValue={data?.title}
          placeholder="ex.: Diversity Networking Event"
          required
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          id="job-image-url-edit"
          className="form-control-small"
          name="imageUrl"
          defaultValue={data?.img}
          placeholder="ex.: https://firebasestorage.googleapis.com/..."
          onChange={handleChange}
        />
        <label>Link</label>
        <input
          id="job-link-edit"
          className="form-control-small"
          name="link"
          defaultValue={data?.link}
          placeholder="ex.: https://utexas.zoom.us/j/..."
          required
          onChange={handleChange}
        />
        <label>Job Description</label>
        <input
          id="job-description-edit"
          className="form-control-small"
          name="description"
          defaultValue={data?.description}
          placeholder="Include all major details surrounding the job posting"
          required
          onChange={handleChange}
        />
        <label>Other Links</label>
        <input
          id="job-other-links-edit"
          className="form-control-small"
          name="otherLinks"
          defaultValue={data?.otherLinks}
          placeholder="ex.: flyer link, merch sign up, etc."
          required
          readOnly // TODO: Fix render before removing this tag
          onChange={handleChange}
        />
        <label>Job UID</label>
        <input
          id="job-uid-edit"
          className="form-control-small"
          name="uid"
          value={data?.uid ?? newUid("job")}
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
          "Add Job Posting"
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

export default JobEdit;
