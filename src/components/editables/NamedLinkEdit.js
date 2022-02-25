import React, { useState } from "react";
import CloseButton from "../partials/CloseButton";
import ConfirmButton from "../partials/ConfirmButton";
import AddButton from "../partials/AddButton";
import { newUid } from "../utils/utils";

function NamedLinkEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data?.uid ?? newUid("namedlink"),
  });

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

  const handleConfirm = () => {
    if (data.name && data.url) {
      props.handleUpdate(data);
      if (props.addNew) {
        setData({ uid: newUid("namedlink") });
      }
    }

    setEditing(false);
  };

  return props.addNew && !editing ? (
    <AddButton
      icon
      onClick={() => {
        setEditing(true);
      }}
    />
  ) : (
    <div className="links-edit-row flex-row">
      <input
        className="form-control-small"
        name="name"
        defaultValue={data.name}
        placeholder="Text"
        onChange={handleChange}
      />
      <input
        className="form-control-small"
        name="url"
        type="url"
        defaultValue={data.url}
        placeholder="URL"
        onChange={handleChange}
      />
      <CloseButton icon onClick={handleDelete} />
      {editing ? <ConfirmButton icon onClick={handleConfirm} /> : null}
    </div>
  );
}

export default NamedLinkEdit;
