import { ArrowLeft, Paperclip, Download } from 'lucide-react'
import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from './Layout'
import './Detail.css'

export default function Detail() {
  const navigate = useNavigate()
  const { ticketId } = useParams()
  const fileInputRef = useRef(null)

  const [comments, setComments] = useState([
    { id: 1, time: '09:24 AM', text: 'Initial report received. Starting investigation.', user: 'Christina' },
    { id: 2, time: '09:35 AM', text: 'Checked power cable and connections. All seems fine.', user: 'John' },
    { id: 3, time: '09:53 AM', text: 'Waiting for technician response.', user: 'System' },
  ])
  const [commentInput, setCommentInput] = useState('')
  const [attachments, setAttachments] = useState([
    { id: 1, name: 'screenshot.png', size: '2.4 MB', uploadedAt: '09:24 AM' }
  ])

  const ticket = {
    id: ticketId || '0010',
    title: 'คอมพิวเตอร์เปิดไม่ติด',
    description: 'เปิดเครื่องแล้วไม่ติดพื้น หน้าจอไม่ทำงาน',
    createdBy: 'Chistina Juyu',
    email: '66160000@go.buu.ac.th',
    department: 'Accounting',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'John Doe',
    notes: 'กำลังตรวจสอบการเชื่อมต่อไฟฟ้าและการติดตั้ง BIOS'
  }

  const addComment = () => {
    if (!commentInput.trim()) return
    const next = {
      id: comments.length + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: commentInput.trim(),
      user: 'You',
    }
    setComments((c) => [...c, next])
    setCommentInput('')
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const newAttachment = {
          id: attachments.length + 1,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setAttachments((prev) => [...prev, newAttachment])
      })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDownload = (fileName) => {
    // Mock download - in real app, this would fetch from server
    alert(`Downloading: ${fileName}`)
    const link = document.createElement('a')
    link.href = '#'
    link.download = fileName
    link.click()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return '#3b82f6'
      case 'Open': return '#f59e0b'
      case 'Closed': return '#10b981'
      case 'Pending': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  return (
    <Layout>
      <div style={{ padding: '0 0 0 0' }}>
        {/* Back button */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/assign')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#7c3aed',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Ticket Details</h2>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', padding: '1.5rem' }}>
          {/* Left Column - Main Ticket Info */}
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>Ticket ID</div>
                <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{ticket.id}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: '600', color: '#4b5563' }}>Status:</span>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  background: getStatusColor(ticket.status) + '20',
                  color: getStatusColor(ticket.status),
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}>
                  {ticket.status}
                </span>
              </div>
            </div>

            <hr style={{ margin: '1rem 0' }} />

            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{ticket.title}</h3>
            <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{ticket.description}</p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Ticket Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: '#4b5563', fontSize: '0.875rem' }}>
                <div><strong>Created by:</strong> {ticket.createdBy}</div>
                <div><strong>Email:</strong> {ticket.email}</div>
                <div><strong>Department:</strong> {ticket.department}</div>
                <div><strong>Priority:</strong> <span style={{ color: '#dc2626', fontWeight: '600' }}>{ticket.priority}</span></div>
                <div><strong>Assigned to:</strong> {ticket.assignedTo}</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Support Notes</h4>
              <p style={{ color: '#4b5563' }}>{ticket.notes}</p>
            </div>

            {/* Attachments section */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Attachments ({attachments.length})</h4>
              
              <div style={{ marginBottom: '1rem' }}>
                {attachments.map((att) => (
                  <div key={att.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem',
                    marginBottom: '0.5rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Paperclip size={16} style={{ color: '#6b7280' }} />
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{att.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{att.size} • {att.uploadedAt}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(att.name)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#2563eb'
                      }}
                    >
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                <Paperclip size={16} />
                Add File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Right Column - Comments */}
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Comments ({comments.length})</h4>

            <div style={{ flex: '1 1 auto', maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {comments.map((c) => (
                <div key={c.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    background: '#d1d5db',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>{c.user}</strong> • {c.time}
                    </div>
                    <div style={{ background: '#f3f4f6', borderRadius: '0.375rem', padding: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment input */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addComment()}
                placeholder="Add a comment..."
                style={{
                  flex: 1,
                  padding: '0.625rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={addComment}
                style={{
                  padding: '0.625rem 1rem',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
