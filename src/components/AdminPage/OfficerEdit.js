import React, { useState } from "react";
import { newUid } from "../utils/utils";
import "./AdminPage.scss";

function OfficerEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? newUid("officer"),
  });

  const handleSave = (e) => {
    e.preventDefault();
    props.handleUpdate(data);
    setEditing(false);
    if (props.addNew) {
      setData({ uid: newUid("officer") });
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
    props.handleDelete(data.uid);
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit">
      <form id={data.uid} onSubmit={handleSave}>
        <label>{"First & Last Name"}</label>
        <input
          id="officer-name-edit"
          className="form-control-small"
          name="name"
          defaultValue={data?.name}
          placeholder="ex.: Chris Nunes"
          required
          onChange={handleChange}
        />
        <label>Officer Role</label>
        <input
          id="officer-role-edit"
          className="form-control-small"
          name="role"
          defaultValue={data?.role}
          placeholder="ex.: Web Developer"
          required
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          id="officer-email-edit"
          className="form-control-small"
          name="email"
          type="email"
          defaultValue={data?.email}
          placeholder="ex.: texashacs@gmail.com"
          onChange={handleChange}
        />
        <label>Ordering Value</label>
        <input
          id="officer-order-edit"
          className="form-control-small"
          name="order"
          type="number"
          defaultValue={data?.order}
          min="0"
          required
          onChange={handleChange}
        />
        <label>LinkedIn URL</label>
        <input
          id="officer-linkedin-edit"
          className="form-control-small"
          name="linkedin"
          type="url"
          defaultValue={data?.linkedin}
          placeholder="ex.: https://linkedin.com/in/firstnamelastname"
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          id="officer-image-url-edit"
          className="form-control-small"
          name="imageUrl"
          type="url"
          defaultValue={data?.imageUrl}
          placeholder={"ex.: https://drive.google.com/..."}
          required
          onChange={handleChange}
        />
        <label>Officer UID</label>
        <input
          id="officer-uid-edit"
          className="form-control-small"
          name="uid"
          type="text"
          value={data?.uid ?? new Date().getTime()}
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
        {props.data?.name == null ? (
          "Add Officer"
        ) : (
          <span>
            {props.data?.order}. {props.data?.name} -{" "}
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

export default OfficerEdit;
