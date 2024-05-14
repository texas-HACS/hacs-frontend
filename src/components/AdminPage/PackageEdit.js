import React, { useState } from "react";
import { newUid } from "../utils/utils";

function PackageEdit(props) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({
        ...props.data,
        uid: props.data?.uid ?? newUid("package"),
    });

    const handleSave = () => {
        props.handleUpdate(data);
        setEditing(false);
        if (props.addNew) {
            setData({uid: newUid("package")});
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
          <label>Package Title</label>
          <input
            id="title-edit"
            className="form-control-small"
            name="title"
            defaultValue={data?.title}
            required
            onChange={handleChange}
          />
          <label>Amount</label>
          <input
            id="amount-edit"
            className="form-control-small"
            name="amount"
            type="number"
            defaultValue={data.amount}
            required
            onChange={handleChange}
          />
          <label>Benefits (separate each benefit with '--')</label>
          <input
            id="benefit-edit"
            className="form-control-small"
            name="benefit"
            type="text"
            defaultValue={data.benefit}
            required
            onChange={handleChange}
          /> 
          <label>Package UID</label>
          <input
            id="package-uid-edit"
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
            {props.data?.title == null ? (
              "Add Package"
            ) : (
              <span>
                {props.data?.title + " - " + props.data?.amount}
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
 export default PackageEdit;