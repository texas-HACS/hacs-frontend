import React, { useState } from "react";
function SignInLinkEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(props.data);
  const [open, setOpen] = useState(false);

  const handleSave = (event) => {
    props.handleUpdate(data);
    setEditing(false);
    event.preventDefault();
  };

  const handleChange = (event) => {
    let newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  };

  const updateVisibility = () => {
    setOpen(!open)
    
    if (open) {
      setEditing(false);
    }

  }

  const editSection = (
    <div className="admin-edit form-wrapper">
      <form onSubmit={handleSave}>
        <input
          id="sign-in-link-edit"
          className="form-control"
          name="link"
          type="url"
          aria-describedby="urlHelp"
          placeholder="Enter URL"
          defaultValue={data.link}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(editing ^ true)} aria-describedby="urlHelp">
      <span className="editable">{data.link}</span>
    </div>
  );

  const up = (
    <span><i className="fa fa-caret-up"></i></span>
  );

  const down = (
    <span><i className="fa fa-caret-down"></i></span>
  );

  return (
    <div className="form-group">
      <h2 className="form-group-title" onClick={updateVisibility} style={{cursor:"pointer"}}>
      Sign In Redirect Link
      {open ? up : down}
      </h2>
      {!!open && (
      <div className="editable-group">
        {!!open && saveSection}
        {!!editing && editSection}
        {!!open && (<small id="urlHelp" className="form-text text-muted">
          This is the link that people will be redirected to when they try to go
          to <a href="https://www.texashacs.org/sign-in">texashacs.org/sign-in</a>
        </small>)}
      </div>)}
    </div>
  );
}

export default SignInLinkEdit;
