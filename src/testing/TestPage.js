import React from "react";
import "./TestPage.scss";

function TestPage(props) {
  return (
    <section className="testpage">
      <div>
        <p>
          This page is for test purposes only. Place components in here to test
          how they render on the site.
        </p>
        <p>
          This page and its route will not exist in the prod environment when
          the site is deployed.
        </p>
      </div>
    </section>
  );
}

export default TestPage;
