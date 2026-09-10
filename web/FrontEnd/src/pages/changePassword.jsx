import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { cmdEntrance } from "../hooks/commandToServer";
import { findErrorByText } from "../types/Codes";

import "../styles/PopUps.css";

async function changePasswordReq(username, newPassword) {
  const res = await cmdEntrance(`authme changepassword ${username} ${newPassword}`);
  
  if (!res) return null;
  return findErrorByText(res.output);
}


function ChangePassword() {
  const [alertInfo, setAlertInfo] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword || currentPassword !== userInfo.password) {
      setAlertInfo({ status: "ERROR", text: "Passwords do not match" });
      return;
    }
    
    if(newPassword === confirmPassword && currentPassword === userInfo.password){
      const code = await changePasswordReq(userInfo.username, newPassword);
      
      if (!code) {
        setAlertInfo({ status: "ERROR", text: "No response from server." });
        return;
      }
      
      setAlertInfo({
        status: code.key.startsWith("ERROR") ? "ERROR" : "SUCCESS",
        text: code.userText || "Unknown error",
      });
      
      if (code.key.startsWith("SUCCESS")) {
        const newUser = { username: userInfo.username, password: newPassword };
        localStorage.setItem("user_info", JSON.stringify(newUser));
        const timer = setTimeout(() => {
          navigate("/account");
        }, 1000);
        
        return () => clearTimeout(timer);
        
      }
      
    }
  };

  return (
    <>
          <main className="popup">
          {alertInfo && (
        <p className={`alert ${alertInfo.status.toLowerCase()}`}>
          {alertInfo.text}
        </p>
      )}
      <form className="form" onSubmit={handleChangePassword}>
        <div className="inputs">
          <input
            type="password"
            placeholder="current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
            />
          <input
            type="password"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
            />
          <input
            type="password"
            placeholder="confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            />

          <button type="submit">Change Password</button>
        </div>
      </form>
    </main>
    </>
  );
}

export default ChangePassword;
