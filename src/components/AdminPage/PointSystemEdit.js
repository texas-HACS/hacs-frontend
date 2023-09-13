import React, { useState } from "react";
import { newUid } from "../utils/utils";

function PointSystemEdit(props) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({
        ...props.data,
        uid: props.data?.uid ?? newUid("activity"),
    });

    const handleSave = () => {
        props.handleUpdate(data);
        setEditing(false);
        if (props.addNew) {
            setData({uid: newUid("activity")});
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
        if (window.confirm("Are you sure you want to delete this part of the Point System?")) {
          handleDelete();
        } else {
          return;
        };
    };

    const editSection = (
        <div className="admin-edit form-wrapper">
          <label>Points</label>
          <input
            id="points-edit"
            className="form-control-small"
            name="points"
            defaultValue={data?.points}
            required
            onChange={handleChange}
          />
          <label>Activity</label>
          <input
            id="activity-edit"
            className="form-control-small"
            name="activity"
            type="text"
            defaultValue={data.activity}
            required
            onChange={handleChange}
          />
          <label>Activity UID</label>
          <input
            id="activity-uid-edit"
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
            ? <div/> 
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
            {props.data?.activity == null ? (
              "Add Activity"
            ) : (
              <span>
                {props.bonus ? "Bonus - " + props.data?.activity : props.data?.points + " - " + props.data?.activity}
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
 export default PointSystemEdit;