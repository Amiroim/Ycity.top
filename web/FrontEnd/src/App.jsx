import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/menu";
import './styles/APP.css'

import Landing from "./pages/Landing";
import Soon from "./pages/Soon";
import Status from "./pages/Status";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import ChangePassword from "./pages/changePassword";
import DeleteAccount from "./pages/DeleteAccount";



function App() {

  return (
    <main className="AppMain">
      <Menu />
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Landing />} />
        <Route path="/soon" element={<Soon />} />
        <Route path="/status" element={<Status />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/logout" element={<Logout />} /> 

        <Route path="/account" element={<Account />} /> 
        <Route path="/account/ChangePassword" element={<ChangePassword />} /> 
        <Route path="/account/DeleteAccount" element={<DeleteAccount />} /> 
        
      </Routes>
    </main>
  );
}

export default App;
