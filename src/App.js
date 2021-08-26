import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";
import Redirect from "./components/Redirect";
import Opportunities from "./components/Opportunities";
import firebase, { auth } from "./_firebase";
import config from "./_config";
import useSticky from "./components/utils/useSticky";
import JumpToTop from "./components/utils/jumpToTop";

function App() {
  const [user, updateUser] = useState(null);
  const [siteContent, updateSiteContent] = useState({});
  const [opportunitiesContent, updateOpportunitiesContent] = useState({});

  const [authorized, updateAuthorization] = useState("Initial State");

  const loginUser = (loginData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginData.username, loginData.password)
      .then((user) => {
        updateAuthorization(user);
        updateUser(user);
      })
      .catch((err) => {
        console.error("Error:", err);
        updateAuthorization(err);
      });
  };

  const signoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        updateAuthorization("Signed Out");
        updateUser(null);
      })
      .catch((err) => {
        console.error("Error:", err);
        updateAuthorization(err);
      });
  };

  // an initial api call to get the site content
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authorizedUser) => {
      if (user) {
        updateUser(authorizedUser);
      }
    });
  }, []);

  useEffect(() => {
    fetch(config.url + "siteContent")
      .then((res) => res.json())
      .then((data) => {
        updateSiteContent(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(config.url + "opportunities")
      .then((res) => res.json())
      .then((data) => {
        updateOpportunitiesContent(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const { isSticky, element } = useSticky();

  return siteContent ? (
    <div className="App">
      <Router>
        <JumpToTop />
        <div>
          <Navigation sticky={isSticky} element={element} />
          <Header />
          <div className="main-content">
            <Switch>
              <Route path="/meet">
                <Redirect link={siteContent.meetingLink} />
              </Route>
              <Route path="/newsletter">
                <Redirect link={"https://t.co/KUhKphLx2d?amp=1"} />
              </Route>
              <Route path="/develop">
                <Redirect link={"https://forms.gle/c7vJN8uMALUwoGbH9"} />
              </Route>
              <Route path="/opportunities">
                <Opportunities
                  editable={user != null}
                  opportunities={opportunitiesContent}
                />
              </Route>
              <Route path="/admin">
                <AdminPage
                  user={user}
                  loginUser={loginUser}
                  signoutUser={signoutUser}
                  siteContent={siteContent}
                  opportunities={opportunitiesContent}
                />
              </Route>
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
  ) : (
    <div />
  );
}
export default App;
