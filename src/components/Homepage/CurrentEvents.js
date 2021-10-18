import React from "react";
import "./Homepage.scss";
import Fade from "react-reveal/Fade";

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