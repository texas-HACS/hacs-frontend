import React, { useState } from "react";
import FileEdit from "../MediaManagement/FileEdit";

function PastOfficerEdit(props) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({...props.data});

    const handleSave = () => {
        props.handleUpdate(props.year, "pastOfficers", data);
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
            <label>Image</label>
            <FileEdit
                key={"file_edit" + props.id}
                file={data.image}
                onSelectFile={(file) => changeData("image", file)}
                onRemoveFile={() => changeData("image", null)}
            />
            <label>Role</label>
            <input
                id="role-edit"
                className="form-control-small"
                name="role"
                defaultValue={data?.role}
                required
                onChange={handleChange}
            />
            <label>Order</label>
            <input
                id="order-edit"
                className="form-control-small"
                name="order"
                defaultValue={data?.order}
                type="number"
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
            <label>Past Officer UID</label>
            <input
                id="past-officer-uid-edit"
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
            <button className="btn btn-primary" onClick={() => setEditing(false)} type="button">
                Cancel
            </button>
            </div>
        </div>
    )

    const saveSection = (
        <div onClick={() => setEditing(editing ^ true)}>
          <p className="editable">
              <span>
                {props.data?.order}. {props.data?.name} -{" "}
                <span className="subtitle">{props.data?.role}</span>
              </span>
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

export default PastOfficerEdit;