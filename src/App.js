import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
      <Route path="/test">
        <TestPage />
      </Route>
    ) : null;

  let { meetingLink, signInLink, newsletterLink, developLink } =
    siteContent.redirects;

  return (
    <div className="App" id="AppRoot">
      <Router>
        <JumpToTop />
        <div className="flex-full">
          <Navigation
            redirects={siteContent.redirects}
            sticky={isSticky}
            element={element}
          />
          <Header />
          <div className="main-content">
            <Switch>
              <Route path="/meet">
                <Redirect to={meetingLink} />
              </Route>
              <Route path="/newsletter">
                <Redirect to={newsletterLink} />
              </Route>
              <Route path="/develop">
                <Redirect to={developLink} />
              </Route>
              <Route path="/opportunities">
                <Opportunities
                  // editable={user != null}
                  opportunities={opportunitiesContent}
                />
              </Route>
              <PrivateRoute path="/admin" user={user} init={initialized}>
                <AdminPage
                  user={user}
                  signoutUser={signoutUser}
                  siteContent={siteContent}
                  opportunities={opportunitiesContent}
                />
              </PrivateRoute>
              <Route path="/login">
                <Login loginUser={loginUser} />
              </Route>
              <Route path={["/sign-in", "/signin", "/check-in", "checkin"]}>
                <Redirect to={signInLink} />
              </Route>
              {testRoute}
              <Route path="/">
                <Homepage
                  memberOfWeek={siteContent.memberOfTheWeek}
                  officers={siteContent.officers}
                />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}
export default App;
