import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cmdEntrance } from "../hooks/commandToServer";
import { findErrorByText } from "../types/Codes";

import Alert from "../components/Alert";

import "../styles/Entrance.css";

async function signupReq(username, password1, password2) {
  if (password1 === password2) {
    const res = await cmdEntrance(`authme register ${username} ${password1}`);
    return findErrorByText(res.output);
  } else {
    return findErrorByText("Your passwords aren't the same");
  }
}

function Signup() {
  const [alertInfo, setAlertInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
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

  const handleSignup = async (e) => {
    e.preventDefault(); // جلوگیری از ریفرش
    const code = await signupReq(username, password1, password2);

    if (code) {
      setAlertInfo({
        status: code.type || (code.key.startsWith("ERROR") ? "ERROR" : "SUCCESS"),
        text: code.userText || "Unknown error",
      });
    }

    if (code.key.startsWith("SUCCESS")) {
      const newUser = { username, password: password1 };
      localStorage.setItem("user_info", JSON.stringify(newUser));
      window.location.reload(); 
    }
  };

  if (hasAccount) {
    return <>{alertInfo && <Alert status={alertInfo.status} text={alertInfo.text} />}</>;
  }

  return (
    <>
      {alertInfo && <Alert status={alertInfo.status} text={alertInfo.text} />}
      <main className="loginForm">
        <h1>Register</h1>
        <form className="form" onSubmit={handleSignup}>

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
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="confirm password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              autoComplete="new-password"
            />

            <button type="submit">Register</button>
          </div>
          <div className="links">
            <div className="line"></div>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Signup;
