import Register from "./LandingPage/Register";
import Description from "./LandingPage/Description";
import Login from "./Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div id="LandingPage">
            <div className="flex flex-col lg:flex-row">

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
      </Switch>
    </Router>
  );
}
 
export default App;
