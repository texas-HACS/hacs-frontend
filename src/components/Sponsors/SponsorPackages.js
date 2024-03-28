import React from "react";
import Fade from "react-reveal/Fade";

function SponsorPackages(props) {

    const packages = (
        <div className="packages">
            {Object.keys(props.data)
                .map((uid) => {
                    let benefit_list = props.data[uid].benefit.split('--');
                    let benefits = (<ul>
                        {benefit_list.map((benefit) => {
                            return (
                                <li>{benefit}</li>
                            )
                        })}
                    </ul>)
                    return(
                        <div className="package">
                            <h3 className="title">{props.data[uid].title}</h3>
                            <p className="amount">${props.data[uid].amount}</p>
                            {benefits}
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
            <h3 className="section-title">Sponsor Packages</h3>
            <p> <br/>
                Become a sponsor today by contacting our Corporate Officer at 
                <a href="mailto: texashacs.corporate@gmail.com"> texashacs.corporate@gmail.com </a>
                and help UT HACS members strive towards their goals. Please contact us with any 
                questions about the partnership.
            </p>
            </Fade>
            <Fade right>
            {packages}
            </Fade>
        </div>
     )
}

export default SponsorPackages;