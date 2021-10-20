import React from "react";
import "./Homepage.scss";
import Fade from "react-reveal/Fade";
import { requirePropFactory } from "@material-ui/core";
import EventCard from "../Opportunities/EventCard";
import { date } from "joi";

function CurrentEvents(props) {

    const today = new Date();
    const dates = [today, new Date(today.getDate + 3), new Date(today.getDate - 3), new Date(today.getDate + 7), new Date(today.getDate + 8)];
    const limit = new Date(today.getDate + 7);
    // Filter the dates to get the valid date
    // A date is valid iff it is between the current date, and the current date + 7 inclusive

    const validDates = dates.filter((date) => {
        if(date.getDate <= limit.getDate && today.getDate <= date.getDate) {
            return date;
        }
    })
    console.log(validDates);
    return(
        <section className="current-events">
            <div className="content-wrapper">
                <Fade bottom>
                    <h3 className="seciton-title">Current Events</h3>   
                </Fade>
                <div className ="event-slider">
                    
                </div>
            </div>
        </section>
    );
}

export default CurrentEvents