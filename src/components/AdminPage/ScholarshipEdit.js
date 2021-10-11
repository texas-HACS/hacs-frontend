import React, { useState } from "react";
import "./AdminPage.scss";
import { newUid } from "../utils/utils";
import FileEdit from "../MediaManagement/FileEdit";

function ScholarshipEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? newUid("scholarship"),
  });

  const handleSave = () => {
    props.handleUpdate("scholarships", data);
    setEditing(false);
    if (props.addNew) {
      setData({ uid: newUid("scholarship") });
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
    props.handleDelete("scholarships", data.uid);
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit">
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
      <div>Image</div>
      <FileEdit
        key={"file_edit" + props.id}
        file={data.image}
        onSelectFile={(file) => changeData("image", file)}
        onRemoveFile={() => changeData("image", null)}
      />
      <label>Scholarship Description</label>
      <small id="scholarshipDescriptionHelp" className="form-text text-muted">
        Include all major details surrounding the scholarship opportunity
      </small>
      <textarea
        id="scholarship-description-edit"
        className="form-control-small"
        name="description"
        defaultValue={data?.description}
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
