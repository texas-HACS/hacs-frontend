import React, { useState } from "react";
import "./AdminPage.scss";
import { newUid } from "../utils/utils";
import FileEdit from "../MediaManagement/FileEdit";

function JobEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? newUid("job"),
  });

  const handleSave = () => {
    props.handleUpdate("jobs", data);
    setEditing(false);
    if (props.addNew) {
      setData({ uid: newUid("job") });
    }
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

  const handleDelete = () => {
    props.handleDelete("jobs", data.uid);
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit">
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
      <div>Image</div>
      <FileEdit
        key={"file_edit" + props.id}
        file={data.image}
        onSelectFile={(file) => changeData("image", file)}
        onRemoveFile={() => changeData("image", null)}
      />
      <label>Link</label>
      <input
        id="job-link-edit"
        className="form-control-small"
        name="link"
        defaultValue={data?.link}
        placeholder="ex.: https://utexas.zoom.us/j/..."
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
      <button className="btn btn-primary" onClick={handleSave}>
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
