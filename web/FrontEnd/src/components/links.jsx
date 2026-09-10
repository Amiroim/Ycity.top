import React from "react";
import { Link } from "react-router-dom";

import "../styles/Links.css";

import telegramLogo from "../assets/telegram.svg";
import discordLogo from "../assets/discord.svg";
import gameLogo from "../assets/game.svg";
import betaLogo from "../assets/beta.svg";


// import instagramLogo from "../assets/instagram.svg";
// import githubLogo from "../assets/github.svg";
// import hiddenmessageLogo from "../assets/chat.svg";

function Links() {
  return (
    <main className="links">
      {/* <Link to="/HiddenMessage" className="link">
        <div className="platform">
          <img src={hiddenmessageLogo} className="socialMediaLogo" alt="" />
          <p className="lable">Hidden message</p>
        </div>
        <div className="addres">demiro.me</div>
      </Link> */}

     <a 
      onClick={(e) => {
        e.preventDefault(); // جلو گیری از رفتار پیشفرض لینک
        navigator.clipboard.writeText("yay.best");
        alert("Copied: yay.best ✅");
      }}
     className="game link">
        <div className="platform">
          <img src={gameLogo} className="socialMediaLogo" alt="gameLogo" />
          <p className="lable">Minecraft server <img src={betaLogo} className="beta" alt="betaLogo" /></p>
        </div>
        <div className="addres">yay.best</div>
      </a>

      <a href="https://t.me/yaygap" className="tg link">
        <div className="platform">
          <img src={telegramLogo} className="socialMediaLogo" alt="telegramLogo" />
          <p className="lable">Telegram Chat</p>
        </div>
        <div className="addres">@yaygap</div>
      </a>

      <a href="https://discord.gg/iholymary-1194645495025512490" className="dc link">
        <div className="platform">
          <img src={discordLogo} className="socialMediaLogo" alt="discordLogo" />
          <p className="lable">Discord server</p>
        </div>
        <div className="addres">Iholymary</div>
      </a>


    </main>
  );
}

export default Links;
