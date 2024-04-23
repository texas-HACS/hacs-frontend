import React from "react";
import Leadership from "./Leadership";
import Alumni from "./Alumni";

function People(props) {
    /*Need to create the link to the page
     use the leadership cards from the home page for this page
     add some history about the org at the top
     then work on the alumni section with the dropdowns
    */
     return (
        <div className="people">
            <section>
                <h1>People</h1>
                <p className="description">
                    History of HACS ...
                </p>
            </section>
            <Leadership officers={props.officers} />
            <Alumni/>
        </div>
     )

}

export default People