import Landingpart from "../components/landingItems";


import Links from "../components/links";
import '../styles/Landing.css'

function Landing() {
  return (
    <div className="landing">
      <Landingpart />
      <Links />
      <ServerStatus />
    </div>
  );
}

export default Landing;
