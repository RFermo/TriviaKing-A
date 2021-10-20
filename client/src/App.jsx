import Signin from "./LandingPage/Signin";
import Description from "./LandingPage/Description";

// Design landing page for medium and smaller devices (component stacked on top of another)

const App = () => {
  return (
    <div id="LandingPage">
      <div className="flex">

        {/* Sign up */}
        <Signin />

        {/* Description */}
        <Description />

      </div>
    </div>
  );
}
 
export default App;
