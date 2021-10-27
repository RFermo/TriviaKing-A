import Register from "./LandingPage/Register";
import Description from "./LandingPage/Description";
import Login from "./Login/Login";
import Dashboard from "./Main/Dashboard";
import Play from "./Main/MenuComponents/Play/Play";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div id="LandingPage">
            <div className="flex flex-col lg:flex-row bg-gray-100">

              {/* Sign up */}
              <Register />

              {/* Description */}
              <Description />

            </div>
          </div>
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        <Route exact path ="/play">
          <Play />
        </Route>

      </Switch>
    </Router>
  );
}
 
export default App;
