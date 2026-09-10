import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cmdEntrance } from "../hooks/commandToServer";
import Alert from "../components/Alert";

import "../styles/Entrance.css";

async function loginReq(username, password) {
  const res = await cmdEntrance(`login ${username} ${password}`);
  const output = res.ok;

  if (output === false)
    return { status: "ERROR", message: "Username or Password incorrect" };
  if (output === true)
    return { status: "SUCCESS", message: "Login successful" };

  return { status: "ERROR", message: "Unexpected response from server" };
}

function Login() {
  const [alertInfo, setAlertInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const hasAccount = userInfo !== null;

  useEffect(() => {
    if (hasAccount) {
      setAlertInfo({ status: "SUCCESS", text: "Logging in..." });
      const timer = setTimeout(() => {
        navigate("/account");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasAccount, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    const resp = await loginReq(username, password);

    setAlertInfo({
      status: resp.status,
      text: resp.message,
    });

    if (resp.status === "SUCCESS") {
      localStorage.setItem("user_info", JSON.stringify({ username, password }));
      setTimeout(() => {
        navigate("/account");
      }, 1000);
    }
  };

  if (hasAccount) {
    return <>{alertInfo && <Alert status={alertInfo.status} text={alertInfo.text} />}</>;
  }

  return (
    <>
      {alertInfo && <Alert status={alertInfo.status} text={alertInfo.text} />}
      <main className="loginForm">
        <h1>Login</h1>
        <form className="form" onSubmit={handleLogin}>
  
          <div className="inputs">
            
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

            <button type="submit">Login</button>
          </div>
          <div className="links">
            <div className="line"></div>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
