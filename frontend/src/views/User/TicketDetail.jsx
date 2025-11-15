// src/views/User/TicketDetail.jsx

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import "./TicketDetail.css";

export default function UserTicketDetail() {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  // Mock Ticket Data (เพราะยังไม่เชื่อม API)
  const [ticket, setTicket] = useState({
    id: ticketId,
    title: "คอมเปิดไม่ติด",
    department: "IT Support",
    priority: "High",
    status: "Open",
    description: "เปิดคอมแล้วไม่ขึ้นจออะไรเลย",
    created_at: "2025-01-10 10:00",
  });

  const [comments, setComments] = useState([
    { id: 1, sender: "User", text: "ผมเจอปัญหาตอนเช้านี้ครับ", time: "10:05" },
    { id: 2, sender: "Staff", text: "รับเรื่องแล้วครับ", time: "10:10" },
  ]);

  const [newComment, setNewComment] = useState("");

  // add new comment (mock only)
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newObj = {
      id: comments.length + 1,
      sender: "User",
      text: newComment,
      time: "Now",
    };

    setComments([...comments, newObj]);
    setNewComment("");
  };

  // delete ticket (only if Open)
  const handleDelete = () => {
    if (ticket.status !== "Open") {
      alert("ลบไม่ได้ เพราะ Ticket ไม่ได้อยู่ในสถานะ Open");
      return;
    }

    alert("ลบ Ticket สำเร็จ (Mock)");
    navigate("/user/dashboard");
  };

  return (
    <div className="user-ticketdetail-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <div className="brand-title">Support Ticket</div>
        </div>

        <nav>
          <div className="nav-item" onClick={() => navigate("/user/dashboard")}>
            📊 Dashboard
          </div>
          <div className="nav-item" onClick={() => navigate("/user/create")}>
            📝 Create Ticket
          </div>
          <div className="nav-item active">🧾 Ticket Detail</div>
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
              <input type="text" placeholder="Search..." className="search-input" />
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
          <h1 className="page-title">Ticket Detail</h1>

          {/* Ticket Info Card */}
          <div className="ticket-info-card">
            <div className="info-row">
              <strong>ID:</strong>
              <span>{ticket.id}</span>
            </div>

            <div className="info-row">
              <strong>Title:</strong>
              <span>{ticket.title}</span>
            </div>

            <div className="info-row">
              <strong>Department:</strong>
              <span>{ticket.department}</span>
            </div>

            <div className="info-row">
              <strong>Priority:</strong>
              <span>{ticket.priority}</span>
            </div>

            <div className="info-row">
              <strong>Status:</strong>
              <span className={`badge ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </span>
            </div>

            <div className="info-row">
              <strong>Description:</strong>
              <p className="desc">{ticket.description}</p>
            </div>

            <div className="info-row">
              <strong>Created:</strong>
              <span>{ticket.created_at}</span>
            </div>

            {/* Action buttons */}
            <div className="action-btns">
              <button
                className="delete-btn"
                disabled={ticket.status !== "Open"}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="comment-section">
            <h2>Comments</h2>

            <div className="comment-list">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className={`comment-item ${
                    c.sender === "User" ? "me" : "staff"
                  }`}
                >
                  <div className="comment-sender">{c.sender}</div>
                  <div className="comment-text">{c.text}</div>
                  <div className="comment-time">{c.time}</div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="comment-input-box">
              <textarea
                rows="3"
                placeholder="พิมพ์ข้อความ..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>

              <button className="send-btn" onClick={handleAddComment}>
                ส่งข้อความ
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
