import { useEffect, useState } from 'react';
import Register from "./LandingPage/Register";
import Description from "./LandingPage/Description";
import Login from "./Login/Login";
import Dashboard from "./Main/Dashboard";
import Play from "./Main/MenuComponents/Play/Play";
import Profile from "./Main/MenuComponents/Profile";
import Friends from "./Main/MenuComponents/Friends";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

export const isAuthorized = async () => {
  const response = await axios.get('http://localhost:4000/verify', { withCredentials: true });
  return response.data.isAuthenticated;
};

const App = () => {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
      ( async () => {
          const response = await isAuthorized();
          setAuth(response);
      }) ();
  }, [auth]);

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

        <Route exact path="/friends">
          { !auth ? <Redirect to="/login" /> : <Friends /> }
        </Route>
        
      </Switch>
    </Router>
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
