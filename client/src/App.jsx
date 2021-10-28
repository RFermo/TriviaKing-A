import { useEffect, useState, } from 'react';
import Register from "./LandingPage/Register";
import Description from "./LandingPage/Description";
import Login from "./Login/Login";
import Dashboard from "./Main/Dashboard";

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          { auth ? <Redirect to="/dashboard" /> : <LandingPage />}
        </Route>

        <Route exact path="/login">
          { auth ? <Redirect to="/dashboard" /> : <Login /> }
        </Route>

        <Route exact path="/dashboard">
          { !auth ? <Redirect to="/login" /> : <Dashboard /> }
        </Route>

        <Route exact path="/play">
          <Play />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/friends">
          <Friends />
        </Route>

        <Route exact path="/logout">
          {/* <Logout /> */}
        </Route>

      </Switch>
    </Router>
  );
}

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
}

export default App;
