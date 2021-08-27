import React, { useState } from "react";
import "./AdminPage.scss";
import { newUid } from "../utils/utils";

function ScholarshipEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? newUid("scholarship"),
  });

  const handleSave = () => {
    props.handleUpdate("scholarships", data);
    setEditing(false);
    setData({ uid: newUid("scholarship") });
  };

  const handleChange = (e) => {
    let newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleDelete = () => {
    props.handleDelete("scholarships", data.uid);
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit">
      <form>
        <label>Scholarship Title</label>
        <input
          id="scholarship-title-edit"
          className="form-control-small"
          name="title"
          defaultValue={data?.title}
          placeholder="ex.: HACS Scholarship 2021"
          required
          onChange={handleChange}
        />
        <label>Link</label>
        <input
          id="scholarship-link-edit"
          className="form-control-small"
          name="link"
          defaultValue={data?.link}
          placeholder="ex.: https://utexas.qualtrics.com/..."
          required
          onChange={handleChange}
        />
        <label>Scholarship Description</label>
        <input
          id="scholarship-description-edit"
          className="form-control-small"
          name="description"
          defaultValue={data?.description}
          placeholder="Include all major details surrounding the scholarship opportunity"
          required
          onChange={handleChange}
        />
        <label>Scholarship UID</label>
        <input
          id="scholarship-uid-edit"
          className="form-control-small"
          name="uid"
          value={data?.uid ?? newUid("scholarship")}
          required
          readOnly
          onChange={handleChange}
        />
      </form>
      <button className="btn btn-primary" onClick={handleSave} type="submit">
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
          "Add Scholarship Posting"
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

export default ScholarshipEdit;
