import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import './my_assign.css'

export default function MyAssign() {
  const navigate = useNavigate()
  const [tickets] = useState([
    {
      id: '0010',
      title: 'คอมพิวเตอร์เปิดไม่ติด',
      description: 'เปิดเครื่องแล้วไม่ใช่พื้น หน้าจอไม่ทำงาน',
      createdBy: 'Chistina Juyu',
      email: '66160000@go.buu.ac.th',
      department: 'Accounting',
      priority: 'High'
    },
    {
      id: '0005',
      title: 'ขอเพิ่มสิทธิ์เข้าถึงโฟลเดอร์ในเซิร์ฟเวอร์',
      description: 'ต้องการสิทธิ์เข้าโฟลเดอร์ "Finance_2025" เพื่อออัปเหลดไฟล์',
      createdBy: 'Chistina Juyu',
      email: '66160000@go.buu.ac.th',
      department: 'Accounting',
      priority: 'Medium'
    },
    {
      id: '0001',
      title: 'เครื่องพิมพ์ไม่ทำงาน',
      description: 'ไฟตามปื่นสีแดง และพิมพ์ไม่ได้ตั้งแต่เช้า',
      createdBy: 'Chistina Juyu',
      email: '66160000@go.buu.ac.th',
      department: 'Accounting',
      priority: 'Low'
    }
  ])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high'
      case 'Medium':
        return 'priority-medium'
      case 'Low':
        return 'priority-low'
      default:
        return 'priority-default'
    }
  }

  return (
    <Layout>
      <div className="content-area">
        <div className="content-container">
          <h2 className="page-title">My Assigned Ticket</h2>

          <div className="tickets-list">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <div className="ticket-main-info">
                    <div className="ticket-row">
                      <span className="label">Ticket ID :</span>
                      <span className="value">{ticket.id}</span>
                    </div>
                    <div className="ticket-row">
                      <span className="label">Title :</span>
                      <span className="value">{ticket.title}</span>
                    </div>
                    <div className="ticket-row">
                      <span className="label">Description :</span>
                      <span className="value">{ticket.description}</span>
                    </div>
                  </div>
                  <div className={`priority-badge ${getPriorityColor(ticket.priority)}`}>
                    Priority : {ticket.priority}
                  </div>
                </div>

                <hr className="divider" />

                <div className="ticket-footer">
                  <div className="ticket-meta">
                    <div className="meta-row">
                      <span className="meta-label">Created by :</span>
                      <span className="meta-value">{ticket.createdBy}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Email :</span>
                      <span className="meta-value">{ticket.email}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Department :</span>
                      <span className="meta-value">{ticket.department}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/assign/detail/${ticket.id}`)}
                    className="details-btn"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
