import { ArrowLeft, Bell, Paperclip, Search } from 'lucide-react';
import { useState } from 'react';
import './Detail.css';

export default function Detail() {
  const [comments, setComments] = useState([
    { id: 1, time: '09:24 AM', text: 'Initial report received. Starting investigation.', user: 'Christina' },
    { id: 2, time: '09:35 AM', text: 'Checked power cable and connections. All seems fine.', user: 'John' },
    { id: 3, time: '09:53 AM', text: 'Waiting for technician response.', user: 'System' },
  ]);
  const [commentInput, setCommentInput] = useState('');

  const ticket = {
    id: '0010',
    title: 'คอมพิวเตอร์เปิดไม่ติด',
    description: 'เปิดเครื่องแล้วไม่ติดพื้น หน้าจอไม่ทำงาน',
    createdBy: 'Chistina Juyu',
    email: '66160000@go.buu.ac.th',
    department: 'Accounting',
    priority: 'High',
    status: 'In Progress',
    assignedTo: '',
    attachment: 'screenshot.png',
  };

  const addComment = () => {
    if (!commentInput.trim()) return;
    const next = {
      id: comments.length + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: commentInput.trim(),
      user: 'You',
    };
    setComments((c) => [...c, next]);
    setCommentInput('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'status-progress';
      case 'Open': return 'status-open';
      case 'Closed': return 'status-closed';
      case 'Pending': return 'status-pending';
      default: return 'status-default';
    }
  };

  return (
    <div className="detail-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <div className="brand-title">Support Ticket</div>
        </div>

        <nav>
          <div className="nav-item">
            <span>📊 Dashboard</span>
          </div>
          <div className="nav-item active">
            <span>📋 My Assigned</span>
          </div>
        </nav>

        <div className="logout">
          <button className="logout-btn">
            <span>🚪 Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
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
              <div className="avatar">T</div>
              <div className="user-info">
                <div className="user-name">IT Support User 1</div>
                <div className="user-email">66160000@go.buu.ac.th</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="back-section">
            <button className="back-btn">
              <ArrowLeft className="back-icon" />
              <span>Back</span>
            </button>
          </div>

          <div className="ticket-header">
            <h1 className="ticket-title">#{ticket.id} {ticket.title}</h1>
            <span className={`status-badge ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <div className="content-grid">
            {/* Left column - Ticket Info */}
            <div className="left-column">
              <div className="info-card">
                <div className="info-row">
                  <div className="info-label">Ticket ID :</div>
                  <div className="info-value">{ticket.id}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Created by :</div>
                  <div className="info-value">{ticket.createdBy}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Email :</div>
                  <div className="info-value">{ticket.email}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Department :</div>
                  <div className="info-value">{ticket.department}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Priority :</div>
                  <div className="info-value">{ticket.priority}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Assigned to :</div>
                  <div className="info-value">{ticket.assignedTo || '-'}</div>
                </div>
              </div>

              <div className="description-card">
                <div className="description-header">
                  <h3 className="description-title">Description</h3>
                  <span className={`status-badge ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="description-text">{ticket.description}</p>
              </div>

              <div className="attachments-card">
                <div className="attachments-label">Attachments :</div>
                <div className="attachment-item">
                  <Paperclip className="attachment-icon" />
                  <span className="attachment-name">{ticket.attachment}</span>
                </div>
              </div>
            </div>

            {/* Right column - Comments */}
            <div className="right-column">
              <div className="comments-section">
                <div className="comments-list">
                  {comments.map((c) => (
                    <div key={c.id} className="comment-item">
                      <div className="comment-avatar"></div>
                      <div className="comment-content">
                        <div className="comment-time">{c.time}</div>
                        <div className="comment-bubble"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="comment-input-section">
                  <button className="attach-btn">
                    <Paperclip className="attach-icon" />
                  </button>
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addComment()}
                    placeholder="Add a comment"
                    className="comment-input"
                  />
                  <button onClick={addComment} className="send-btn">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}