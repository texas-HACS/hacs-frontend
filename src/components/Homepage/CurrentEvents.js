import React from "react";
import "./Homepage.scss";
import Fade from "react-reveal/Fade";
import { requirePropFactory } from "@material-ui/core";
import EventCard from "../Opportunities/EventCard";

function CurrentEvents(props) {
    return(
        <section className="current-events">
            <div className="content-wrapper">
                <Fade bottom>
                    <h3 className="seciton-title">Current Events</h3>   
                </Fade>
                <div className ="event-slider">
                    /*
                        Here I want to feed in the next 7 days events into the EventCard, and somehow
                        add these instances of EventCard into a slider.
                    */
                </div>
            </div>
        </section>
    );
}

export default CurrentEvents