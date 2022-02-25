import React, { useState } from "react";
import CloseButton from "../partials/CloseButton";
import ConfirmButton from "../partials/ConfirmButton";
import AddButton from "../partials/AddButton";
import { newUid } from "../utils/utils";
import NamedLinkEdit from "./NamedLinkEdit";

function LinksEdit(props) {
  const [data, setData] = useState(props.data ?? {});

  const updateLink = (linkData) => {
    let updating = { ...data };
    updating[linkData.uid] = linkData;
    setData(updating);

    if(props.onUpdate) {
      props.onUpdate(updating);
    }
  };

  const deleteLink = (uid) => {
    let updating = { ...data };
    if (updating[uid] != null) {
      delete updating[uid];
    }
    setData(updating);

    if (props.onUpdate) {
      props.onUpdate(updating);
    }
  };

  return (
    <div className="editable-group">
      {Object.keys(data).map((uid) => (
        <NamedLinkEdit
          id={uid}
          key={uid}
          data={data[uid]}
          handleUpdate={updateLink}
          handleDelete={deleteLink}
        />
      ))}
      <NamedLinkEdit
        addNew
        data={{}}
        handleUpdate={updateLink}
        handleDelete={deleteLink}
      />
    </div>
  );
}

export default LinksEdit;
