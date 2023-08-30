import React, { useState } from "react";
// import SliderApi from "../../api/slider";
import FileEdit from "../MediaManagement/FileEdit";
import { newUid } from "../utils/utils";

function SliderEdit(props) {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({
        ...props.data,
        uid: props.data?.uid ?? newUid("image"),
    });

    const handleSave = () => {
        const savedData = { ...data };
        props.handleUpdate(savedData);
        // (props.addNew
        //     ? SliderApi.create(props.user, savedData)
        //     : SliderApi.update(props.user, savedData.uid, savedData)
        // ).then((resData) => (resData ? props.handleUpdate(resData) : null));
        if (props.addNew) {
            setData({ uid: newUid("image") });
        }   
        setEditing(false);

    };

    const changeData = (key, value) => {
        let newData = { ...data };
        newData[key] = value;
        setData(newData);
    };

    const handleChange = (e) => {
        let { name, value, type } = e.target;
        value = value === "" ? null : value;
        changeData(name, value)
    };

    const handleDelete = () => {
        //     : SliderApi.delete(props.user, data.uid).then(() =>
        //         props.handleDelete(data.uid)
        //         );
        props.handleDelete(data.uid);
        setEditing(false);
    };

    const confirmDelete = () => {
        if (props.addNew) {
            setEditing(false);
        }
        else if (window.confirm("Are you sure you want to delete this image?")) {
            handleDelete();
        } else {
            return;
        };
    };

    const editChange = () => {
        if (props.addNew) {
            setEditing(!!(editing ^ true));
        }
    }

    const editSection = (
        <div className="admin-edit form-wrapper">
            <label>Image Alt Text</label>
            <input
                id=""
                className="form-control-small"
                name="alt"
                defaultValue={data?.alt}
                placeholder="ex.: HACS Fall 2023 Kickoff"
                required
                onChange={handleChange}
            />
            <label>Ordering Value</label>
            <input 
                id=""
                type="number"
                min={0}
                className="form-control-small"
                name="order"
                defaultValue={data?.order}
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
            <label>Image UID</label>
            <input
                id=""
                className="form-control-small"
                name="uid"
                value={data?.uid ?? new Date().getTime()}
                required
                readOnly
            />
            <button className="btn btn-primary" onClick={handleSave}>
                {props.addNew ? "Create" : "Save"}
            </button>
            <button className="btn btn-primary" onClick={confirmDelete}>
                {props.addNew ? "Cancel" : "Delete"}
            </button>
        </div>
    );

    const saveSection = (
        <div onClick={editChange}>
            <p className="editable">
                {props.addNew ? "Add Image" : null}
            </p>
        </div>
    );
    
    if (props.addNew) {
        return (
            <div className="editable-group">
                {saveSection}
                {!!editing && editSection}
            </div>
        )
    } else {
        return (
            <div className="editable-group">
                {saveSection}
                {editSection}
            </div>
        )
    };
}

export default SliderEdit;