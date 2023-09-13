import React, { useState } from "react";
import { newUid } from "../utils/utils";

function FamiliaEdit(props) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({
        ...props.data,
        uid: props.data?.uid ?? newUid("familia"),
    });

    const handleSave = () => {
        props.handleUpdate(data);
        setEditing(false);
        if (props.addNew) {
            setData({uid: newUid("familia")});
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
        if (window.confirm("Are you sure you want to delete this Familia?")) {
          handleDelete();
        } else {
          return;
        };
    };

    const editSection = (
        <div className="admin-edit form-wrapper">
            {/* Will familias be shown with a group name or with all the names in familia */}
          <label>{"Familia Name"}</label>
          <input
            id="familia-name-edit"
            className="form-control-small"
            name="name"
            defaultValue={data?.name}
            required
            onChange={handleChange}
          />
          <label>Points</label>
          <input
            id="familia-points-edit"
            className="form-control-small"
            name="points"
            type="number"
            min={0}
            defaultValue={data?.points}
            required
            onChange={handleChange}
          />
          <label>Familia UID</label>
          <input
            id="familia-uid-edit"
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
          <button className="btn btn-primary" onClick={props.addNew ? () => setEditing(false) : confirmDelete} type="button">
            {props.addNew ? "Cancel" : "Delete"}
          </button>
          </div>
        </div>
      );
    
      const saveSection = (
        <div onClick={() => setEditing(editing ^ true)}>
          <p className="editable">
            {props.data?.name == null ? (
              "Add Familia"
            ) : (
              <span>
                {props.data?.name}
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
 export default FamiliaEdit;