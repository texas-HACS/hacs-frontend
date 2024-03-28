import React from "react";
import SponsorSection from "./SponsorSection";
import SponsorPackages from "./SponsorPackages";

function Sponsors(props) {

    return( 
        <div className="sponsors">
            <section>
                <h1>Sponsors</h1>
                <p className="description">
                    HACS is a student organization at the University of Texas at Austin that aims 
                    to empower and provide support for Hispanic and Latinx students in computer 
                    science through academic, professional, and social events.
                    <br/><br/>
                    For the 2023-2024 school year HACS had a active member count of 90+ HACS members 
                    (Most active members post-2020)
                    <br/>
                    {/* chart image here */}
                </p>
            </section>
            <SponsorSection data={props.data?.sponsors} />
            <SponsorPackages data={props.data?.packages} />
        </div>
    )
}

export default Sponsors;