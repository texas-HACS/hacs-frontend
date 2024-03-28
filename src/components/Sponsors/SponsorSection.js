import React from "react";
import Fade from "react-reveal/Fade";

function SponsorSection(props) {
// for each sponsor in list (should have an id, name, and logo in firebase), organize them into rows
const sponsors = (
    // incorporate tiers?? and also make it so that you have to add an image instead of calls to website
    // add links their website
    <div className="sponsor">
        {Object.keys(props.data)
            .map((uid) => {
                return(
                    <div className="sponsor-item">
                        <img src={props.data[uid].logo}/>
                        <h4 className="title">{props.data[uid].name}</h4>
                    </div>
                )
            })
        }
    </div>
);
// editable packages should include a name/title, amount, benefits, and description
return(
    <div>
        <Fade bottom>
        <h3 className="section-title">Sponsors</h3>
        </Fade>
        <Fade right>
        {sponsors}
        </Fade>
    </div>
 )

}

export default SponsorSection;