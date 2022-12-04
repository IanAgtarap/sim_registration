import "./App.css";
import { Route, Routes } from "react-router";
import { useState } from "react";

//NOTE: import pages
import HomePage from "./Pages/HomePage";
import OtpPage from "./Pages/OtpPage";
import DashboardPage from "./Pages/DashboardPage";
import LogInPage from "./Pages/LogInPage";
import AdminPage from "./Pages/AdminPage";
import HelpPage from "./Pages/HelpPage";

function App() {
  const [currentUserNumber, setCurrentUserNumber] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState("");

  return (
    <div className="vh-100">
      <Routes>
        <Route
          path="/"
          element={<HomePage setUserNumber={setCurrentUserNumber} />}
        />
        <Route
          path="/otp"
          element={<OtpPage getUserNumber={currentUserNumber} />}
        />
        <Route
          path="/dashboard"
          element={<DashboardPage getUserNumber={currentUserNumber} />}
        />
        <Route
          path="/log-admin"
          element={<LogInPage setAdmin={setCurrentAdmin} />}
        />
        <Route path="/admin" element={<AdminPage getAdmin={currentAdmin} />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </div>
  );
}

export default App;
