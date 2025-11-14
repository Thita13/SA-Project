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
  const { title, description, priority, assigned_to, user_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO ticket (title, description, priority, status, assigned_to, user_id, created_at, updated_at) VALUES (?, ?, ?, "open", ?, ?, NOW(), NOW())',
      [title, description, priority, assigned_to || null, user_id]
    );
    res.status(201).json({ message: 'Ticket created', ticketId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllTickets, getTicketById, createTicket };
