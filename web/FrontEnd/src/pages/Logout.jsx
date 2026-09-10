import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Alert status="SUCCESS" text="Logging Out..." />
  );
}

export default Logout;
