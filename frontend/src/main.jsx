// frontend/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";

// Import Router
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import LoginPage from "./views/Login.jsx";

// USER pages
import UserDashboard from "./views/User/Dashboard.jsx";
import UserCreateTicket from "./views/User/CreateTicket.jsx";
import UserTicketDetail from "./views/User/TicketDetail.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<LoginPage />} />

        {/* USER ROUTES */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/create" element={<UserCreateTicket />} />
        <Route path="/user/ticket/:ticketId" element={<UserTicketDetail />} />

        {/* 404 → Redirect to Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
