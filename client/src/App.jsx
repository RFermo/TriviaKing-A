import React, { useEffect, useState } from 'react';
import Register from "./LandingPage/Register";
import Description from "./LandingPage/Description";
import Login from "./Login/Login";
import Dashboard from "./Main/Dashboard/Dashboard";
import Play from "./Main/MenuComponents/Play/Game/Play";
import Profile from "./Main/MenuComponents/Profile/Profile";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Privacy from './Main/Misc/Privacy';
import Terms from "./Main/Misc/Terms";

export const isAuthorized = async () => {
  const response = await axios.get('http://localhost:4000/user/isAuthorized', { withCredentials: true });
  return response.data.isAuthenticated;
};

const App = () => {

  const [auth, setAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      ( async () => {
          const response = await isAuthorized(false)
          setAuth(response);
          setLoaded(true)
      }) ();
  }, [auth]);

  let routes = () => {
    return (
      <Router>
      <Switch>
        <Route exact path="/">
          { auth ? <Redirect to="/dashboard" /> : <LandingPage /> }
        </Route>

        <Route exact path="/login">
          { auth ? <Redirect to="/dashboard" /> : <Login /> }
        </Route>

        <Route exact path="/dashboard">
          { !auth ? <Redirect to="/login" /> : <Dashboard /> }
        </Route>

        <Route exact path="/play">
          { !auth ? <Redirect to="/login" /> : <Play /> }
        </Route>

        <Route exact path="/profile">
          { !auth ? <Redirect to="/login" /> : <Profile /> }
        </Route>

        <Route exact path="/privacy">
          <Privacy />
        </Route>

        <Route exact path="/terms">
          <Terms />
        </Route>
        
      </Switch>
    </Router>
    );
  };

  return (
    <div>
      {loaded ? routes() : <div>Loading</div>}
    </div>
  );
};

const LandingPage = () => {
  return (
    <div id="LandingPage">
      <div className="flex flex-col lg:flex-row bg-gray-100">

        {/* Sign up */}
        <Register />

        {/* Description */}
        <Description />
      </div>
  </div>
  );
};

export default App;
