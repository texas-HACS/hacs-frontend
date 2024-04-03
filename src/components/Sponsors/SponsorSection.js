import React, { useState } from "react";
import Fade from "react-reveal/Fade";

function SponsorSection(props) {

let platinum_sponsors = []
let gold_sponsors = []
let focs_sponsors = []

let sort_sponsors =
    Object.keys(props.data)
    .map((uid) => (props.data[uid]))
    .sort((a, b) => {
        return a.tier - b.tier;
    })
    .map((item) => {
        if (item.tier == "Gold") {
            gold_sponsors.push(item);
        } else if (item.tier == "Platinum") {
            platinum_sponsors.push(item);
        } else {
            focs_sponsors.push(item);
            
        }
    })

const platinum_section = (
    platinum_sponsors.length > 0 ?
        <div> 
            <h3 className="tier-header">Platinum</h3>
            <div className="sponsor">
            {platinum_sponsors.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            }).map((item) => {
                return (
                    <div className="sponsor-item">
                        <a href={item.site} target="_blank">
                            <img src={item.logo}/>
                        </a>
                        <h4>{item.name}</h4>
                    </div>
                )
            })}
            </div>
        </div> 
        : <div/>
)

const gold_section = (
    gold_sponsors.length > 0 ?
        <div>
            <h3 className="tier-header">Gold</h3>
            <div className="sponsor">
            {gold_sponsors.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            }).map((item) => {
                return (
                    <div className="sponsor-item">
                        <a href={item.site} target="_blank">
                            <img src={item.logo}/>
                        </a>
                        <h4>{item.name}</h4>
                    </div>
                )
            })}
            </div>
        </div>
        : <div/>
)

const focs_section = ( 
    focs_sponsors.length > 0 ?
    <div>
        <h3 className="tier-header">FOCS</h3>
        <div className="sponsor">
        {focs_sponsors.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
        }).map((item) => {
            return (
                <div className="sponsor-item">
                    <a href={item.site} target="_blank">
                        <img src={item.logo}/>
                    </a>
                    <h4>{item.name}</h4>
                </div>
            )
        })}
        </div>
    </div>
    : <div/>
)

return(
    <div>
        <Fade bottom>
        <h3 className="section-title">Sponsors</h3>
        </Fade>
        <Fade>
        {platinum_section}
        </Fade>
        {gold_section}
        {focs_section}
    </div>
 )

}

export default SponsorSection;