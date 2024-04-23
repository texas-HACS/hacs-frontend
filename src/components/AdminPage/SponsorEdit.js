import React, { useState } from "react";
import { newUid } from "../utils/utils";
import FileEdit from "../MediaManagement/FileEdit";

function SponsorEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? newUid("sponsor"),
  });

  const handleSave = () => {
    props.handleUpdate(data);
    setEditing(false);
    if (props.addNew) {
      setData({ uid: newUid("sponsor") });
    }
  };

  const changeData = (key, value) => {
    let newData = { ...data };
    newData[key] = value;
    setData(newData);
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    value = value === "" ? null : value;
    changeData(name, value);
  };

  const handleDelete = () => {
    props.handleDelete(data.uid);
    setEditing(false);
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this sponsor?")) {
      handleDelete();
    } else {
      return;
    };
  };

  const editSection = (
    <div className="admin-edit form-wrapper">
      <label>Sponsor</label>
      <input
        id="name-edit"
        className="form-control-small"
        name="name"
        defaultValue={data?.name}
        required
        onChange={handleChange}
      />
      <label>Company Website</label>
      <input
        id="site-edit"
        className="form-control-small"
        name="site"
        type="text"
        defaultValue={data.site}
        required
        onChange={handleChange}
      />
      <label>Logo</label>
      <FileEdit
        key={"file_edit" + props.id}
        file={data.image}
        onSelectFile={(file) => changeData("image", file)}
        onRemoveFile={() => changeData("image", null)}
      />
      <label>Tier</label>
      <br />
      <div className="tier-options">
        <label htmlFor="platinum">Platinum
          <input
            id="platinum"
            value="Platinum"
            name="tier"
            type="radio"
            checked={data.tier == "Platinum" ? "checked" : ""}
            required
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="gold">Gold
          <input
            id="gold"
            value="Gold"
            name="tier"
            type="radio"
            checked={data.tier == "Gold" ? "checked" : ""}
            required
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="focs">FOCS
          <input
            id="focs"
            value="FOCS"
            name="tier"
            type="radio"
            checked={data.tier == "FOCS" ? "checked" : ""}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <label>Sponsor UID</label>
      <input
        id="sponsor-uid-edit"
        className="form-control-small"
        name="uid"
        type="text"
        value={data?.uid ?? new Date().getTime()}
        required
        readOnly
      />
      <div className="button-container flex-row">
        <button className="btn btn-primary" onClick={handleSave}>
          {props.addNew ? "Create" : "Save"}
        </button>
        {props.bonus
          ? <div />
          : <button className="btn btn-primary" onClick={props.addNew ? () => setEditing(false) : confirmDelete} type="button">
            {props.addNew ? "Cancel" : "Delete"}
          </button>
        }
      </div>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(editing ^ true)}>
      <p className="editable">
        {props.data?.name == null ? (
          "Add Sponsor"
        ) : (
          <span>
            {props.data?.name + " - " + props.data?.tier}
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
export default SponsorEdit;