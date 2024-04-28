import React, { useState } from "react";
import PastOfficerEdit from "./PastOfficerEdit";
import AlumniEdit from "./AlumniEdit";

function PeopleEdit(props) {
    const [open, setOpen] = useState(false);

    let pastOfficerData;
    let alumniData;

    if (!props.addNew) {
        pastOfficerData = (
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

    return (
        props.addNew 
            ? (
                ""
            ) 
            : (
                <div>
                <h3 onClick={() => setOpen(!open)}>{props.id}</h3>
                {console.log(open)}
                {!!open && pastOfficerData}
                {!!open && alumniData}
                </div>
            )
    )
}

export default PeopleEdit;