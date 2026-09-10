import "../styles/Alert.css";
import okLogo from "../assets/success.svg";
import errLogo from "../assets/error.svg";

function Alert({ status, text }) {
  const icon = status === "ERROR" ? errLogo : okLogo;

  return (
    <div className={`alert ${status.toLowerCase()}`}>
      <img src={icon} alt={status} />
      <p>{text}</p>
    </div>
  );
}

export default Alert;
