import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { cmdEntrance } from "../hooks/commandToServer";
import { findErrorByText } from "../types/Codes";

import "../styles/PopUps.css";

function DeleteAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertInfo, setAlertInfo] = useState(null);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const hasAccount = userInfo !== null;

  useEffect(() => {
    if (!hasAccount) {
      setAlertInfo({ status: "ERROR", text: "You must log in first." });
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasAccount, navigate]);

  console.log(userInfo)
  async function deleteAccountReq(username, password) {

    if (
      !userInfo ||
      username !== userInfo.username ||
      password !== userInfo.password
    ) {
      return { status: "ERROR", userText: "Username or Password incorrect" };
    }

    try {
      const res = await cmdEntrance(`authme unregister ${username}`);
      if (!res) return { status: "ERROR", userText: "No response from server" };
        console.log(res);
        
      const code = findErrorByText(res.output);
      return code;
    } catch (err) {
      return { key: "ERROR", userText: "Request failed" };
    }
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    const code = await deleteAccountReq(username, password);
    console.log(code);
    
    if (!code) {
      setAlertInfo({ status: "ERROR", text: "Unknown error" });
      return;
    }

    setAlertInfo({
      status: code.key.startsWith("ERROR") ? "ERROR" : "SUCCESS",
      text: code.userText || "Unexpected error",
    });

    if (code.key.startsWith("SUCCESS")) {
      localStorage.removeItem("user_info");
      setTimeout(() => {
        navigate("/register"); 
      }, 1500);
    }
  };

  return (
    <main className="popup">
      {alertInfo && (
        <p className={`alert ${alertInfo.status.toLowerCase()}`}>
          {alertInfo.text}
        </p>
      )}
      <form className="form" onSubmit={handleDeleteAccount}>
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
          <button type="submit">Delete account</button>
        </div>
      </form>
    </main>
  );
}

export default DeleteAccount;
