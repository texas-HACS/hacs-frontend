import React, { useState } from "react";
import { newUid } from "../utils/utils";

function AlumniEdit(props) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({
        ...props.data,
        uid: props.data?.uid ?? newUid("alum"),
    })

    const handleSave = () => {
        props.handleUpdate(props.year, "alumni", data);
        setEditing(false);
        if (props.addNew) {
          setData({ uid: newUid("alum") });
        }
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
    
      const handleDelete = () => {
        props.handleDelete(props.year, data.uid);
        setEditing(false);
      };
    
      const confirmDelete = () => {
        if (window.confirm("Are you sure you want to delete this alum?")) {
          handleDelete();
        } else {
          return;
        };
      };

    const editSection = (
        <div className="admin-edit form-wrapper">
            <label>Name</label>
            <input
                id="name-edit"
                className="form-control-small"
                name="name"
                defaultValue={data?.name}
                required
                onChange={handleChange}
            />
            <label>LinkedIn</label>
            <input
                id="linkedIn-edit"
                className="form-control-small"
                name="linkedin"
                defaultValue={data?.linkedin}
                required
                onChange={handleChange}
            />
            <label>Alumni UID</label>
            <input
                id="alum-uid-edit"
                className="form-control-small"
                name="uid"
                type="text"
                value={data?.uid}
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
    )

    const saveSection = (
        <div onClick={() => setEditing(editing ^ true)}>
          <p className="editable">
            {props.data?.name == null ? (
                "Add Alum"
            ) : (
              <span>
                {data?.name}
              </span>
            )}
          </p>
        </div>
      );

    return (
        <div className="officer-edit editable-group">
            {saveSection}
            {!!editing && editSection}
        </div>
    )
}

export default AlumniEdit;