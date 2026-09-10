import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css"; 
import "../styles/landingItems.css"; 

import menu from "../assets/menu.svg";
import closeMenu from "../assets/closeMenu.svg";
import server from "../assets/server.svg";
import home from "../assets/home.svg";
import account from "../assets/account.svg";
import signup from "../assets/signup.svg";
import login from "../assets/login.svg";
import logout from "../assets/logout.svg";




function Menu() {
  const [open, setOpen] = useState(false);
  const host = typeof window !== "undefined" 
    ? window.location.href.split("//")[1] 
    : "";

  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const hasAccount = userInfo !== null;


  return (
    <>
      <ul className="Topmenu">
        <li>{host}</li>
        <li>
          <img 
            src={menu} 
            className="menu" 
            alt="Menu Icon" 
            onClick={() => setOpen(true)} 
          />
        </li>
      </ul>

      <div className={`menu-overlay ${open ? "open" : ""}`}>
        <img 
          onClick={() => setOpen(false)}
          src={closeMenu} 
          className="menu close-btn" 
          alt="Close Menu Icon" 
        />
        <ul>
          <li>
            <Link className="menu-link" to="/" onClick={() => setOpen(false)}>
              <img
                src={home}
                className="icon" 
                alt="Icon" 
              />
              <p>Home</p>
            </Link>
          </li>

          {!hasAccount && (
            <>
              <li>
                <Link className="menu-link" to="/login" onClick={() => setOpen(false)}>
                <img
                  src={login}
                  className="icon" 
                  alt="Icon" 
                />
                <p>Login</p>
                </Link>
              </li>
              <li>
                <Link className="menu-link" to="/register" onClick={() => setOpen(false)}>
                <img
                  src={signup}
                  className="icon" 
                  alt="Icon" 
                />
                <p>Signup</p>
                </Link>
              </li>
            </>
          )}

          {hasAccount && (
            <>
              <li>
                <Link className="menu-link" to="/account" onClick={() => setOpen(false)}>
                <img
                  src={account}
                  className="icon" 
                  alt="Icon" 
                />
                <p>Account</p>
                </Link>
                </li>
              <li>
                <Link className="menu-link" to="/logout" onClick={() => setOpen(false)}>
                <img
                  src={logout}
                  className="icon" 
                  alt="Icon" 
                />
                <p>Logout</p>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link className="menu-link" to="/status" onClick={() => setOpen(false)}>
              <img
                src={server}
                className="icon" 
                alt="Icon" 
              />
              <p>Status</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
