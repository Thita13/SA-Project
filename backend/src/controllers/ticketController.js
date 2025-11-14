const db = require('../config/db');

// GET /api/tickets - ดึง ticket ทั้งหมด
const getAllTickets = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.id, t.title, t.description, t.priority, t.status, t.assigned_to, t.created_at, t.updated_at, u.name_user AS created_by
      FROM ticket t
      JOIN users u ON t.user_id = u.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/tickets/:id - ดึง ticket ตาม id
const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM ticket WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Ticket not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/tickets - สร้าง ticket ใหม่
const createTicket = async (req, res) => {
  // 1. (แก้ไข!) เอา user_id ออกจาก req.body
  // เราจะไม่เชื่อ user_id ที่ส่งมาจาก body อีกต่อไป
  const { title, description, priority, assigned_to } = req.body;
  
  // 2. (เพิ่มใหม่!) ดึง user id ที่แท้จริงมาจาก Token
  // (authMiddleware เป็นคนถอดรหัส Token แล้วแนบมาให้ใน req.user)
  const userIdFromToken = req.user.id; 

  try {
    const [result] = await db.query(
      'INSERT INTO ticket (title, description, priority, status, assigned_to, user_id, created_at, updated_at) VALUES (?, ?, ?, "open", ?, ?, NOW(), NOW())',
      // 3. (แก้ไข!) ใส่ userIdFromToken ลงไปแทน user_id จาก body
      [title, description, priority || 'medium', assigned_to || null, userIdFromToken]
    );
    
    // 4. (แนะนำ) ส่งข้อมูล ticket ที่สร้างเสร็จกลับไป
    const [newTicket] = await db.query('SELECT * FROM ticket WHERE id = ?', [result.insertId]);
    res.status(201).json(newTicket[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllTickets, getTicketById, createTicket };