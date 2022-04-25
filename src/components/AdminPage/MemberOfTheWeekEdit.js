import React, { useState } from "react";
import FileEdit from "../MediaManagement/FileEdit";

function MemberOfTheWeekEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(props.data);

  const handleSave = (e) => {
    props.handleUpdate(data);
    setEditing(false);
    e.preventDefault();
  };

  const changeData = (key, value) => {
    let newData = { ...data };
    newData[key] = value;
    setData(newData);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    value = value === "" ? null : value;
    changeData(name, value);
  };

  const editSection = (
    <div className="admin-edit form-wrapper">
      <label>Name</label>
      <input
        id="motw-name-edit"
        className="form-control-small"
        name="name"
        defaultValue={data.name}
        placeholder={"First & last name"}
        required
        onChange={handleChange}
      />
      <label>Description</label>
      <textarea
        id="motw-description-edit"
        className="form-control-small"
        name="description"
        defaultValue={data.description}
        placeholder="ex.: President"
        required
        onChange={handleChange}
      />
      <label>LinkedIn URL</label>
      <input
        id="motw-linkedin-edit"
        className="form-control-small"
        name="linkedin"
        type="url"
        defaultValue={data.linkedin}
        placeholder="ex.: linkedin.com/in/firstnamelastname"
        onChange={handleChange}
      />
      <label>Image</label>
      <FileEdit
        key={"file_edit" + props.id}
        file={data.image}
        onSelectFile={(file) => changeData("image", file)}
        onRemoveFile={() => changeData("image", null)}
      />
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(editing ^ true)}>
      <p>
        <span className="editable">{data.name}</span>
      </p>
      {/* TODO: Add X mark to close dropdown */}
    </div>
  );

  return (
    <div className="form-group">
      <h2 className="form-group-title">Member of the Week</h2>
      <div className="editable-group">
        {saveSection}
        {!!editing && editSection}
      </div>
    </div>
  );
}

export default MemberOfTheWeekEdit;
