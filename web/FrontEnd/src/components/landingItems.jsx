import useServerStatus from "../hooks/useServerStatus";

import "../styles/landingItems.css";
import "../styles/serverStatus.css"

import logo from "../assets/logoBaner.jpg";

function Landingpart() {
  const status = useServerStatus();
  const isOnline = status?.online || false;
  

  return (
      <div className="Landingpart">
        <img src={logo} className="logo" alt="Amiro Logo" />
        <h1>
          <div className={isOnline ? "greenPulse" : "redPulse"}></div>
          Ycity
        </h1>
        <p>| Coming soon! |</p>
      </div>
  );
}

export default Landingpart;
