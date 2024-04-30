import React, { useState } from "react";
import PastOfficerEdit from "./PastOfficerEdit";
import AlumniEdit from "./AlumniEdit";

function PeopleEdit(props) {
    const [open, setOpen] = useState(false);
    let year1;
    let year2;

    let pastOfficerData;
    let alumniData;

    const handleChange = (e) => {
        let { name, value } = e.target;
        value = value === "" ? null : value;
        name == "year1" ? year1 = value : year2 = value;
    }

    const handleSave = () => {
        if (year1 && year2) {
            props.handleAddYear(year1, year2, null);
            setOpen(false);
        }
    }

    if (!props.addNew) {
        pastOfficerData = (
            // add a note that offices are added by clicking the archive button under the officer section
            Object.keys(props.data.pastOfficers)
                .sort((a, b) => {
                    return props.data.pastOfficers[a].order - props.data.pastOfficers[b].order
                })
                .map((uid) => (
                    <PastOfficerEdit
                        id={uid}
                        key={uid}
                        year={props.id}
                        data={props.data.pastOfficers[uid]}
                        handleUpdate={props.handleUpdate}
                    />
                ))
        )

        if (props.data.alumni) {
            alumniData = (
                <div>
                    {/* Might need to add a check to prevent errors if alumni data is empty */}
                    <hr/>
                    <p><b>Graduates</b></p>
                    {Object.keys(props.data?.alumni)
                        .sort((a, b) => {
                            return props.data?.alumni[a].name.localeCompare(props.data?.alumni[b].name)
                        })
                        .map((uid) => (
                            <AlumniEdit
                                id={uid}
                                key={uid}
                                year={props.id}
                                data={props.data?.alumni[uid]}
                                handleUpdate={props.handleUpdate}
                                handleDelete={props.handleDelete}
                            />
                        ))}
                    <AlumniEdit
                        addNew
                        year={props.id}
                        handleUpdate={props.handleUpdate}
                        handleDelete={props.handleDelete}
                        data={{}}
                    />
                </div>
            )
        } else {
            alumniData = (
                <div>
                    <hr/>
                    <p><b>Graduates</b></p>
                    <AlumniEdit
                        addNew
                        year={props.id}
                        handleUpdate={props.handleUpdate}
                        handleDelete={props.handleDelete}
                        data={{}}
                    />
                </div>
            )
        }
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

    const up = (
        <span><i className="fa fa-caret-up"></i></span>
    );
    
    const down = (
        <span><i className="fa fa-caret-down"></i></span>
    );

    return (
        props.addNew ? (
            <div>
                <h3 onClick={() => setOpen(!open)}>
                    Add Year
                    {open ? up : down}
                </h3>
                {!!open && editSection}
            </div>
        ) : (
            <div>
            <h3 onClick={() => setOpen(!open)}>
                {props.id}
                {open ? up : down}
            </h3>
            {!!open && pastOfficerData}
            {!!open && alumniData}
            </div>
        )
    )
}

export default PeopleEdit;