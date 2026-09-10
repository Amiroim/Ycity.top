import { useNavigate,Link } from "react-router-dom";

import editeIcon from "../assets/edite.svg";
import delAccIcon from "../assets/delAcc.svg";

import "../styles/Account.css";

function Account() {
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const navigate = useNavigate();

  if (!userInfo) {
    return <p>You are not logged in.</p>;
  }

  return (
    <main className="profile">
      <div className="names">
        <div className="profileName">
          <h1>{userInfo.username[0].toUpperCase()}</h1>
        </div>
        <p>{userInfo.username}</p>
      </div>
      <div className="edits">
        <div className="btns">
          <Link to="/account/ChangePassword">
            <button  className="changes">
              <img className="icon" src={editeIcon} alt="" />
              <p> Change password</p>
            </button>
          </Link>
        </div>
        <Link to="/account/DeleteAccount">
          <button className="deAcc">
            <img className="icon" src={delAccIcon} alt="" />
            <p> Delete Account</p>
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Account;
