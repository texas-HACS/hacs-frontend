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
import TestRoute from "./testing/TestRoute";

function App() {
  // const [user, updateUser] = useState(null);
  const [siteContent, updateSiteContent] = useState(null);
  const [opportunitiesContent, updateOpportunitiesContent] = useState(null);

  // const [authorized, updateAuthorization] = useState("Initial State");

  const loginUser = async (loginData) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(loginData.username, loginData.password)
      .then((user) => {
        // updateAuthorization(user);
        // updateUser(user);
      })
      .catch((err) => {
        console.error("Error:", err);
        // updateAuthorization(err);
      });
  };

  const signoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // updateAuthorization("Signed Out");
        // updateUser(null);
      })
      .catch((err) => {
        console.error("Error:", err);
        // updateAuthorization(err);
      });
  };

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((authorizedUser) => {
  //     if (user) {
  //       updateUser(authorizedUser);
  //     }
  //   });
  // });

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

  let { meetingLink, signInLink, newsletterLink, developLink } =
    siteContent.redirects;
  return (
    <div className="App" id="AppRoot">
      <Router>
        <JumpToTop />
        <div>
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
              <Route path="/admin">
                <AdminPage
                  // user={user}
                  loginUser={loginUser}
                  signoutUser={signoutUser}
                  siteContent={siteContent}
                  opportunities={opportunitiesContent}
                />
              </Route>
              <Route path="/login">
                <Login loginUser={loginUser} />
              </Route>
              <Route path="/sign-in">
                <Redirect to={signInLink} />
              </Route>
              <TestRoute />
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
