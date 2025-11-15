// src/views/User/CreateTicket.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Paperclip } from "lucide-react";
import "./CreateTicket.css";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    priority: "Low",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("📌 Ticket Submitted (Mock Only)");
    console.log(formData);

    alert("สร้าง Ticket สำเร็จ (Mock)!");
    navigate("/user/dashboard");
  };

  return (
    <div className="user-create-page">
      {/* ============ Sidebar ============ */}
      <div className="sidebar">
        <div className="brand">
          <div className="brand-title">Support Ticket</div>
        </div>

        <nav>
          <div className="nav-item" onClick={() => navigate("/user/dashboard")}>
            📊 Dashboard
          </div>
          <div className="nav-item active">📝 Create Ticket</div>
        </nav>

        <div className="logout">
          <button className="logout-btn">🚪 Logout</button>
        </div>
      </div>

      {/* ============ Main Content ============ */}
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
          <h1 className="page-title">Create Ticket</h1>

          <form className="ticket-form" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label>Title / หัวข้อปัญหา *</label>
              <input
                type="text"
                required
                name="title"
                placeholder="เช่น: เปิดคอมไม่ติด"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description / รายละเอียด *</label>
              <textarea
                rows="5"
                required
                name="description"
                placeholder="ระบุรายละเอียดปัญหา"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label>Priority / ความสำคัญ *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low (ต่ำ)</option>
                <option value="Medium">Medium (ปานกลาง)</option>
                <option value="High">High (สูง)</option>
                <option value="Urgent">Urgent (วิกฤต)</option>
              </select>
            </div>

            {/* Attachment */}
            <div className="form-group">
              <label>Attachment / แนบไฟล์</label>
              <div className="file-box">
                <Paperclip className="file-icon" />
                <input
                  type="file"
                  name="attachment"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="submit-section">
              <button type="submit" className="submit-btn">
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
