import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";

function Familias(props) {

  const pointSystem = (
    <div>
      <Fade bottom>
      <h3 className="section-title">Point System</h3>
      </Fade>
      <Fade right>
      <table className="points">
        <tr>
          <th>Points</th>
          <th>Activity</th>
        </tr>
        <tr>
          <td>5</td>
          <td>attend a Div Org event together (includes GMs, Socials, Study Nights)</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Study together/HW/Hang out</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Visit a library that's not the PCL</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Visit a food place someone in your Familia has never been to</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Hang out with another Familia (for at least 30 mins)</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Profesional Development (networking event, mock interview, tech talk etc)</td>
        </tr>
        <tr>
          <td>15</td>
          <td>Shopping! (grocery, clothes, professional clothing)</td>
        </tr>
        <tr>
          <td>15</td>
          <td>Visit an Austin Attraction</td>
        </tr>
        <tr>
          <td>15</td>
          <td>Eat with another Familia</td>
        </tr>
        <tr>
          <td>???</td>
          <td>Surprise me ;)</td>
        </tr>
        <tr className="blank_row"></tr>
        <tr>
          <th>Bonus</th>
          <td></td>
        </tr>
        <tr>
          <td>x2</td>
          <td>Do any of these activities with every Familia (HACS events don't count)</td>
        </tr>
      </table>
      </Fade>
    </div>
  )

    return (
        <div className="familias">
          <Fade>
            <section>
              <h1>Familias</h1>
              <p className="description">
                Familias Description here
              </p>
            </section>
          </Fade>
          {pointSystem}
        </div>
      );
}

export default Familias;