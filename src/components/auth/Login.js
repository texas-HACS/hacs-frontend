import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

function Login(props) {
  const userField = useRef(null);
  const passField = useRef(null);

  // used to rerender the page and redirect to admin if logged in successfully
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const submitLogin = (e) => {
    props
      .loginUser({
        username: userField.current.value,
        password: passField.current.value,
      })
      .then((user) => {
        if (user) {
          setRedirectToReferrer(true);
        }
      });
  };

  // Redirect if authenticated or prompt for login
  return redirectToReferrer ? (
    <Navigate to={"/admin"} />
  ) : (
    <div className="login-wrapper form-wrapper">
      <div className="login">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={userField}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            ref={passField}
          />
        </div>
        <button className="btn btn-primary" onClick={submitLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
