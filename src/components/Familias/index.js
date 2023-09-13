import React from "react";
import Fade from "react-reveal/Fade";
import renderScoreboard from "./Scoreboard.js";
import renderPointSystem from "./PointSystem.js";

function Familias(props) {

  const pointSystem = (
    <div>
      <Fade bottom>
      <h3 className="section-title">Point System</h3>
      </Fade>
      <Fade right>
        {renderPointSystem(props.data?.points, props.data?.bonus)}
      </Fade>
    </div>
  );

  const scoreboard = props.data.familias ? (
    <div>
      <Fade bottom>
        <h3 className="section-title">Scoreboard</h3>
      </Fade>
      <Fade right>
        {renderScoreboard(props.data?.familias)}
      </Fade>
    </div>
  ) : (
    <div/>
  );

  return (
    <div className="familias">
      <Fade>
        <section>
          <h1>Familias</h1>
          <p className="description">
            HACS Familias exists to help students build genuine and helpful 
            relationships within the organization, between upperclassmen 
            and underclassmen.
          </p>
        </section>
      </Fade>
      {scoreboard}
      {pointSystem}
    </div>
  );
}

export default Familias;