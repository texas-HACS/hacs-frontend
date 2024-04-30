import React from "react";
import Leadership from "./Leadership";
import Alumni from "./Alumni";

function People(props) {
    /*
     add some history about the org at the top
     then work on the alumni section with the dropdowns
    */

    const alumniSection = (
        <section className="alumni">
            <h3 className="section-title">Past Officers and Alumni</h3>
                {Object.keys(props.data?.pastYears)
                .sort((a, b) => {
                    return b.localeCompare(a)
                })
                .map((year) => {
                    return (
                    <Alumni
                        year={year}
                        pastOfficers={props.data?.pastYears[year].pastOfficers}
                        alumni={props.data?.pastYears[year].alumni}
                    />
                    )
                })
                }
        </section>
    )

     return (
        <div className="people">
            <section>
                <h1>People</h1>
                <p className="description">
                    The Hispanic Association of Computer Scientists (HACS) aims to empower and 
                    provide support for Hispanic and Latinx students in computer science through 
                    academic, professional, and social events. Our Officers make all of our events 
                    possible and active members can apply for a role at the end of each year. HACS 
                    alumni are also showcased for networking opportunities.
                </p>
            </section>
            <Leadership officers={props.data?.officers} />
            {alumniSection}
        </div>
     )

}

export default People