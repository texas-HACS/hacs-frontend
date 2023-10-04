import React, { useState } from "react";
import Datetime from "react-datetime";


function InstagramEdit(props) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState(props.data);

    const handleSave = () => {
        props.handleUpdate(data);
        setEditing(false);
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

    const handleDateChange = (name, date) => {
        try {
          const value = new Date(date).toISOString();
          changeData(name, value);
        } catch (e) {
          console.log("Invalid date");
        }
    };

    const editSection = (
        <div className="admin-edit form-wrapper">
            <label>URL</label>
            <input
                id="url-edit"
                className="form-control-small"
                name="url"
                type="text"
                defaultValue={data?.url}
                required
                onChange={handleChange}
            />
            <label>Date</label>
            <Datetime
                className="small"
                value={new Date(data?.date)}
                onChange={(date) => {
                    handleDateChange("date", date);
                }}
            />
            <label>Post UID</label>
            <input
                id="post-uid-edit"
                className="form-control-small"
                name="uid"
                type="text"
                value={data?.uid}
                required
                readOnly
            />
            <div className="button-container flex-row">
                <button className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );

    const saveSection = (
        <div onClick={() => setEditing(editing ^ true)}>
            <p className="editable">
                <span>
                    {new Date(data?.date).toDateString()}
                </span>
            </p>
        </div>
    )

    return (
        <div className="editable-group">
            {saveSection}
            {!!editing && editSection}
        </div>
    );

}

export default InstagramEdit;