# (GUIDE) Functional React

As mentioned in `developing_in_react.md`, there are two ways to code in React: Functional and Class. Our website is coded with functional react

# Basics of Functional React

Functional React involves the use of Javascript functions to create components of a website's frontend, unlike Class-based React which uses classes instead.

An example of a component made with functional React can be found below:
```
import React from "react";
import { Link } from "react-router-dom";
import Socials from "../partials/Socials";

function Header() {
  return (
    <div className="global-header-container">
      <div className="global-header">
        <Link to="/" className="header-desktop">
          <h3>Hispanic Association of Computer Scientists</h3>
        </Link>
        <h3 className="header-mobile">HACS</h3>
        <Socials />
      </div>
    </div>
  );
}

export default Header;
```

This is from src/Header/index.js and is what makes the component shown below:
![Header Component when rendered on a computer](image.png)

This code only creates the component but would not be able to render it onto the screen on it's own. By exporting the function, we can call this component along with many others so we can render them all at once.

Also, the returned portion of the function should contain the html elements for the component and any other functional components like `<Socials />` for example.

If some data processing is needed or other things need to be done before the compenents are returned make sure to code it outside of the return section.

The main downside with Functional React is that it generally has less features than class-based React especially a lack of state variables which are needed to display information that changes over time. However, this issue is solved by the use of React hooks like useState, useEffect and more. Videos discussing these hooks can be found on the `README`