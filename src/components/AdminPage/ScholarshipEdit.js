import React, { Fragment, useState } from "react";
import ScholarshipAPI from "../../api/scholarship";
import ImageEdit from "../MediaManagement/ImageEdit";

function ScholarshipEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(props.data);
  const { addNew, user } = props;

  const handleSave = () => {
    (addNew
      ? ScholarshipAPI.create(user, data)
      : ScholarshipAPI.update(user, data.uid, data)
    ).then((resData) => (resData ? props.handleUpdate(resData) : null));
    if (addNew) {
      setData(null);
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
    value = type === "number" ? parseInt(value, 10) : value;
    value = value === "" ? null : value;
    changeData(name, value);
  };

  const handleDelete = () => {
    addNew
      ? setData(null)
      : ScholarshipAPI.delete(user, data.uid).then(() =>
          props.handleDelete(data.uid)
        );
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit form-wrapper">
      <label>Scholarship Title</label>
      <input
        id="scholarship-title-edit"
        className="form-control-small"
        name="title"
        defaultValue={data?.title}
        placeholder="ex.: HACS Scholarship 2021"
        required
        onChange={handleChange}
      />
      <div>Image</div>
      <ImageEdit
        key={"image_edit" + props.id}
        {...data?.image}
        onConfirm={(img) => changeData("image", img)}
        onRemoveImage={() => changeData("image", null)}
      />
      <label>Scholarship Description</label>
      <small id="scholarshipDescriptionHelp" className="form-text text-muted">
        Include all major details surrounding the scholarship opportunity
      </small>
      <textarea
        id="scholarship-description-edit"
        className="form-control-small"
        name="description"
        defaultValue={data?.description}
        required
        onChange={handleChange}
      />
      <label>Link</label>
      <input
        id="scholarship-link-edit"
        className="form-control-small"
        name="link"
        defaultValue={data?.link}
        placeholder="ex.: https://utexas.qualtrics.com/..."
        onChange={handleChange}
      />
      {addNew ? null : (
        <Fragment>
          <label>Scholarship UID</label>
          <input
            id="scholarship-uid-edit"
            className="form-control-small"
            name="uid"
            value={data.uid}
            required
            readOnly
            onChange={handleChange}
          />
        </Fragment>
      )}
      <button className="btn btn-primary" onClick={handleSave}>
        {addNew ? "Create" : "Save"}
      </button>
      <button
        className="btn btn-primary"
        onClick={() => handleDelete()}
        type="button"
      >
        {addNew ? "Cancel" : "Delete"}
      </button>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(editing ^ true)}>
      <p className="editable">
        {addNew ? "Add Scholarship Posting" : <span>{props.data?.title}</span>}
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

export default ScholarshipEdit;
