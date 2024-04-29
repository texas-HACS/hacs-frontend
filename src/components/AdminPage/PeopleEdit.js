import React, { useState } from "react";
import PastOfficerEdit from "./PastOfficerEdit";
import AlumniEdit from "./AlumniEdit";

function PeopleEdit(props) {
    const [open, setOpen] = useState(false);

    let pastOfficerData;
    let alumniData;

    const handleChange = () => {

    }

    const handleSave = () => {

    }

    if (!props.addNew) {
        pastOfficerData = (
            // might need to add check to prevent error if past officers is empty
            // add a note that offices are added by clicking the archive button under the officer section
            Object.keys(props.data.pastOfficers)
                .sort((a, b) => {
                    return props.data.pastOfficers[a].order - props.data.pastOfficers[b].order
                })
                .map((uid) => (
                    <PastOfficerEdit
                        id={uid}
                        key={uid}
                        data={props.data.pastOfficers[uid]}
                        handleUpdate={props.handleUpdate}
                    />
                ))
        )

        alumniData = (
            <div>
                {/* Might need to add a check to prevent errors if alumni data is empty */}
                {Object.keys(props.data.alumni)
                    .sort((a, b) => {
                        return props.data.alumni[a].name.localeCompare(props.data.alumni[b].name)
                    })
                    .map((uid) => (
                        <AlumniEdit
                            id={uid}
                            key={uid}
                            data={props.data.alumni[uid]}
                            handleUpdate={props.handleUpdate}
                        />
                    ))}
                <AlumniEdit
                    addNew
                    handleUpdate={props.handleUpdate}
                    data={{}}
                />
            </div>
        )
    }

    const editSection = (
        <div className="admin-edit form-wrapper">
            <label>Year 1</label>
            <input
                id="year1-edit"
                className="form-control-small"
                name="year1"
                type="number"
                required
                onChange={handleChange}
            />
            <label>Year 2</label>
            <input
                id="year2-edit"
                className="form-control-small"
                name="year2"
                type="number"
                required
                onChange={handleChange}
            />
            <div className="button-container flex-row">
                <button className="btn btn-primary" onClick={handleSave}>
                    Add
                </button>
                <button className="btn btn-primary" onClick={() => setOpen(false)} type="button">
                    Cancel
                </button>
            </div>
        </div>
    )

    return (
        props.addNew 
            ? (
                <div>
                    <h3 onClick={() => setOpen(!open)}>Add Year</h3>
                    {!!open && editSection}
                </div>
            ) 
            : (
                <div>
                <h3 onClick={() => setOpen(!open)}>{props.id}</h3>
                {!!open && pastOfficerData}
                {!!open && alumniData}
                </div>
            )
    )
}

export default PeopleEdit;