import React, { useState } from "react";

function Alumni(props) {
    const [open, setOpen] = useState(false)

    const pastOfficers = (
        <div className="officers">
            {Object.keys(props.pastOfficers)
                .sort((a, b) => {
                    return props.pastOfficers[a].order - props.pastOfficers[b].order
                })
                .map((uid) => {
                    return (
                        <div className="officer">
                            <p><b>{props.pastOfficers[uid].role}</b></p> 
                            <img src={props.pastOfficers[uid].image.url}/>
                            <p>
                                {props.pastOfficers[uid].name} 
                                <a href={props.pastOfficers[uid].linkedin}>
                                        <i className="fab fa-linkedin"></i>
                                </a>
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )

    const graduates = (
        <div className="grads">
            {Object.keys(props.alumni)
                .sort((a, b) => {
                    return props.alumni[a].name.localeCompare(props.alumni[b].name)
                })
                .map((uid) => {
                    return (
                            <p className="grad">
                                {props.alumni[uid].name}
                                <a href={props.alumni[uid].linkedin}>
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </p>
                    )
                })
            }
        </div>
    )

    const info = (
        <div>
            <h4>Officers</h4>
            {pastOfficers}
            <hr/>
            <h4>Graduates</h4>
            {graduates}
        </div>
    )

    const up = (
        <span><i className="fa fa-caret-up"></i></span>
    )

    const down = (
        <span><i className="fa fa-caret-down"></i></span>
    )

    return (
        <div>
        <h3 onClick={() => {setOpen(!open)}} className="dropdown">
            {props.year}
            {open ? up : down} 
        </h3>
        {!!open && info}
        </div>
    )
}

export default Alumni