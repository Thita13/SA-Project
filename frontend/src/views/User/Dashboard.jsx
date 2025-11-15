// src/views/User/Dashboard.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import "./Dashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  // Mock Ticket Data (เพราะยังไม่ใช้ API)
  const [tickets] = useState([
    {
      id: 1,
      title: "คอมเปิดไม่ติด",
      status: "Open",
      priority: "High",
      created_at: "2025-01-10",
    },
    {
      id: 2,
      title: "อินเทอร์เน็ตช้า",
      status: "In Progress",
      priority: "Medium",
      created_at: "2025-01-09",
    },
    {
      id: 3,
      title: "ขอสิทธิ์เข้าระบบ",
      status: "Closed",
      priority: "Low",
      created_at: "2025-01-05",
    },
  ]);

  // สรุปจำนวน
  const totalOpen = tickets.filter((t) => t.status === "Open").length;
  const totalInProgress = tickets.filter((t) => t.status === "In Progress").length;
  const totalClosed = tickets.filter((t) => t.status === "Closed").length;

  return (
    <div className="user-dashboard-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <div className="brand-title">Support Ticket</div>
        </div>

        <nav>
          <div className="nav-item active">📊 Dashboard</div>
          <div className="nav-item" onClick={() => navigate("/user/create")}>
            📝 Create Ticket
          </div>
        </nav>

        <div className="logout">
          <button className="logout-btn">🚪 Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </div>

          <div className="header-right">
            <button className="bell-btn">
              <Bell className="bell-icon" />
              <span className="notification-dot"></span>
            </button>

            <div className="user-profile">
              <div className="avatar">U</div>
              <div className="user-info">
                <div className="user-name">User</div>
                <div className="user-email">user@example.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <h1 className="page-title">Dashboard</h1>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="card card-open">
              <div className="card-title">Open</div>
              <div className="card-number">{totalOpen}</div>
            </div>

            <div className="card card-progress">
              <div className="card-title">In Progress</div>
              <div className="card-number">{totalInProgress}</div>
            </div>

            <div className="card card-closed">
              <div className="card-title">Closed</div>
              <div className="card-number">{totalClosed}</div>
            </div>
          </div>

          {/* Ticket Table */}
          <div className="ticket-table-section">
            <h2 className="table-title">My Tickets</h2>

            <table className="ticket-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>หัวข้อ</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.title}</td>
                    <td>{t.priority}</td>
                    <td>
                      <span className={`badge ${t.status.replace(" ", "").toLowerCase()}`}>
                        {t.status}
                      </span>
                    </td>
                    <td>{t.created_at}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/user/ticket/${t.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}
