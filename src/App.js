import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import config from "./_config";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";
import Redirect from "./components/Redirect";
import Opportunities from "./components/Opportunities";
import firebase from "./_firebase";
import useSticky from "./components/utils/useSticky";
import JumpToTop from "./components/utils/jumpToTop";
import Login from "./components/auth/Login";
import "react-datetime/css/react-datetime.css";
import PrivateRoute from "./components/auth/PrivateRoute";
import TestPage from "./testing/TestPage";
import QRCodeManager from "./components/QRCode/QRCodeManager";
import DisplayImg from "./components/QRCode/DisplayImg";

function App() {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [siteContent, updateSiteContent] = useState(null);
  const [opportunitiesContent, updateOpportunitiesContent] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.getCurrentUser((user) => {
      setUser(user);
      setInitialized(true);
    });

    // React will call this to unsubscribe from the auth handler
    return unsubscribe;
  }, []);

  const loginUser = (loginData) => {
    return firebase.auth
      .signIn(loginData.username, loginData.password)
      .then(({ user }) => {
        setUser(user);
        return user;
      });
  };

  const signoutUser = () => {
    firebase.auth
      .signOut(firebase.auth._)
      .then(() => {})
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  useEffect(() => {
    fetch(config.url + "/siteContent", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        updateSiteContent(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(config.url + "/opportunities", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          data = { events: {}, jobs: {}, scholarships: {} };
        }
        updateOpportunitiesContent(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const { isSticky, element } = useSticky();
  if (!siteContent) {
    return <div />;
  }

  const testRoute =
    config.env === "local" ||
    config.env === "local-dev" ||
    config.env === "dev" ? (
      <Route path="/test" element={<TestPage />} />
    ) : null;

  let { meetingLink, signInLink, newsletterLink, developLink } =
    siteContent.redirects;

  return (
    <div className="App" id="AppRoot">
      <BrowserRouter>
        <JumpToTop />
        <div className="full-site-view flex-full">
          <Navigation
            redirects={siteContent.redirects}
            sticky={isSticky}
            element={element}
          />
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="meet" element={<Redirect to={meetingLink} />} />
              <Route
                path="newsletter"
                element={<Redirect to={newsletterLink} />}
              />
              <Route path="develop" element={<Redirect to={developLink} />} />
              <Route
                path="opportunities"
                element={<Opportunities opportunities={opportunitiesContent} />}
              />
              <Route
                path="admin"
                element={<PrivateRoute user={user} init={initialized} />}
              >
                <Route
                  index
                  element={
                    <AdminPage
                      user={user}
                      signoutUser={signoutUser}
                      siteContent={siteContent}
                      opportunities={opportunitiesContent}
                    />
                  }
                />
                {["qr", "qr-code", "generate-qr"].map((path, i) => (
                  <Fragment>
                    <Route path={path} element={<QRCodeManager />} key={i} />
                    <Route path={`${path}/:id`} element={<DisplayImg />} />
                  </Fragment>
                ))}
              </Route>
              <Route path="login" element={<Login loginUser={loginUser} />} />
              {["sign-in", "signin", "check-in", "checkin"].map((path, i) => (
                <Route
                  path={path}
                  element={<Redirect to={signInLink} />}
                  key={i}
                />
              ))}
              {testRoute}
              <Route
                path="/"
                element={
                  <Homepage
                    memberOfWeek={siteContent.memberOfTheWeek}
                    officers={siteContent.officers}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
