// src/views/User/TicketDetail.jsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import "./TicketDetail.css";
import ticketService from "../../services/ticketService";

export default function UserTicketDetail() {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const data = await ticketService.getTicket(ticketId);
        if (!mounted) return;
        setTicket(data || null);
        setComments((data && data.comments) || []);
      } catch (err) {
        console.error('Failed to load ticket', err);
        alert('ไม่สามารถโหลดข้อมูล Ticket ได้');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => (mounted = false);
  }, [ticketId]);

  // add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const payload = { text: newComment };
      const added = await ticketService.addComment(ticketId, payload);
      // append returned comment or fallback
      const commentObj = added || { id: Date.now(), sender: 'User', text: newComment, time: 'Now' };
      setComments((prev) => [...prev, commentObj]);
      setNewComment("");
    } catch (err) {
      console.error('Failed to add comment', err);
      alert('ไม่สามารถส่งคอมเมนต์ได้');
    }
  };

  // delete ticket (only if Open)
  const handleDelete = async () => {
    if (!ticket) return;
    if (ticket.status !== "Open") {
      alert("ลบไม่ได้ เพราะ Ticket ไม่ได้อยู่ในสถานะ Open");
      return;
    }
    try {
      await ticketService.deleteTicket(ticketId);
      alert('ลบ Ticket สำเร็จ');
      navigate('/user/dashboard');
    } catch (err) {
      console.error('Failed to delete ticket', err);
      alert('ลบ Ticket ไม่สำเร็จ');
    }
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
            Dashboard
          </div>
          <div className="nav-item" onClick={() => navigate("/user/create")}>
            Create Ticket
          </div>
          <div className="nav-item active">Ticket Detail</div>
        </nav>

        <div className="logout">
          <button className="logout-btn">Logout</button>
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

            {loading && <div>Loading ticket...</div>}
            {!loading && !ticket && <div>Ticket not found.</div>}

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
