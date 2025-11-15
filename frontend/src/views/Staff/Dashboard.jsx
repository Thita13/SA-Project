import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import './dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ALL')
  
  const tickets = [
    { id: '0010', user: 'Chistina Juyu', title: 'คอมพิวเตอร์เปิดไม่ติด', priority: 'High', date: '2025/10/20', status: 'open' },
    { id: '0009', user: 'Chistina Juyu', title: 'ไม่สามารถเชื่อมต่อ Wi-Fi ได้', priority: 'High', date: '2025/10/20', status: 'open' },
    { id: '0008', user: 'Chistina Juyu', title: 'เครื่องสแกนลายนิ้วมือไม่บันทึก', priority: 'Medium', date: '2025/10/20', status: 'open' },
    { id: '0007', user: 'Angelina Joe', title: 'สิ่งพิศสนามอีเมล', priority: 'Medium', date: '2025/10/20', status: 'open' },
    { id: '0006', user: 'Angelina Joe', title: 'ขอ Backup ข้อมูลประจำเดือน', priority: 'Low', date: '2025/10/19', status: 'progress' },
    { id: '0005', user: 'Chistina Juyu', title: 'ขอเพิ่มสิทธิ์ถึงโฟลเดอร์ไนเซิร์ฟเวอร์', priority: 'Medium', date: '2025/10/19', status: 'closed' },
    { id: '0004', user: 'Chistina Juyu', title: 'เครื่องคอมมีเสียงดังผิดปกติ', priority: 'Medium', date: '2025/10/18', status: 'closed' },
    { id: '0003', user: 'Angelina Joe', title: 'ไม่สามารถออกจากระบบ POS', priority: 'High', date: '2025/10/14', status: 'closed' },
    { id: '0002', user: 'Angelina Joe', title: 'ระบบ ERP ค้างระหว่างใช้งาน', priority: 'High', date: '2025/10/12', status: 'closed' },
    { id: '0001', user: 'Chistina Juyu', title: 'เครื่องพิมพ์ไม่ทำงาน', priority: 'Low', date: '2025/10/9', status: 'closed' },
  ]

  const getStatusCounts = () => {
    return {
      open: tickets.filter(t => t.status === 'open').length,
      progress: tickets.filter(t => t.status === 'progress').length,
      closed: tickets.filter(t => t.status === 'closed').length,
    }
  }

  const getFilteredTickets = () => {
    if (activeTab === 'ALL') return tickets
    if (activeTab === 'Open') return tickets.filter(t => t.status === 'open')
    if (activeTab === 'In Progress') return tickets.filter(t => t.status === 'progress')
    if (activeTab === 'Closed') return tickets.filter(t => t.status === 'closed')
    return tickets
  }

  const counts = getStatusCounts()
  const filteredTickets = getFilteredTickets()

  return (
    <Layout>
      <div className="content">
          <h1 className="page-title">Ticket</h1>
          
          <div className="status-cards">
            <div className="status-card">
              <div className="status-label">Open</div>
              <div className="status-count">{counts.open}</div>
            </div>
            <div className="status-card">
              <div className="status-label">Progress</div>
              <div className="status-count">{counts.progress}</div>
            </div>
            <div className="status-card">
              <div className="status-label">Closed</div>
              <div className="status-count">{counts.closed}</div>
            </div>
          </div>

          <h2 className="section-title">ระบบ Ticket</h2>

          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              ALL
            </button>
            <button 
              className={`tab ${activeTab === 'Open' ? 'active' : ''}`}
              onClick={() => setActiveTab('Open')}
            >
              Open
            </button>
            <button 
              className={`tab ${activeTab === 'In Progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('In Progress')}
            >
              In Progress
            </button>
            <button 
              className={`tab ${activeTab === 'Closed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Closed')}
            >
              Closed
            </button>
          </div>

          <div className="table-container">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>UserName</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.user}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.date}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-details">Details</button>
                        {ticket.status === 'open' && (
                          <button className="btn-assign">Assign to me</button>
                        )}
                        {ticket.status === 'progress' && (
                          <button className="btn-progress">In Progress</button>
                        )}
                        {ticket.status === 'closed' && (
                          <button className="btn-resolved">Resolved</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard
