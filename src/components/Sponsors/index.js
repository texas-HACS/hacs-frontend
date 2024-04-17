import React from "react";
import SponsorSection from "./SponsorSection";
import SponsorPackages from "./SponsorPackages";
import Fade from "react-reveal/Fade";

function Sponsors(props) {

    return( 
        <div className="sponsors">
            <Fade>
            <section>
                <h1>Sponsors</h1>
                <p className="description">
                    HACS is a student organization at the University of Texas at Austin that aims 
                    to empower and provide support for Hispanic and Latinx students in computer 
                    science through academic, professional, and social events:
                    <br/>
                    <ul>
                        <li>Bi-weekly General Meetings</li>
                        <li>Monthly Social Events</li>
                        <li>Monthly Study Nights</li>
                        <li>Monthly Familias Events</li>
                        <li>Diversity Networking Night (Exclusive Career Fair for members of HACS, ABCS, Q++ with our Sponsors)</li>
                        <li>Professional Development Workshops / Presentations</li>
                        <li>Custom Company Sponsored Events (Presentations, Trivia, Resume Reviews, Engineer Panels)</li>
                    </ul>
                    For the 2023-2024 school year HACS had an active member count of 90+ HACS members 
                    (Most active members post-2020)
                    <br/>
                    {/* this image is hard coded so will need to be manually updated */}
                    <img src="https://firebasestorage.googleapis.com/v0/b/hacs-opensource-int.appspot.com/o/sponsor_images%2FHACS-Member-Chart.png?alt=media&token=d9002dfe-293a-43d2-b9e8-d8d223ec9176"/>
                    <br/>
                </p>
            </section>
            </Fade>
            <SponsorSection data={props.data?.sponsors} />
            <SponsorPackages data={props.data?.packages} />
        </div>
    )
}

export default Sponsors;