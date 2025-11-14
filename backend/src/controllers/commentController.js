const db = require('../config/db');

// GET /api/comments/:ticketId - ดึง comment ของ ticket
const getCommentsByTicket = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM comment WHERE ticket_id = ?', [ticketId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/comments - สร้าง comment ใหม่
const createComment = async (req, res) => {
  const { message, ticket_id, user_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO comment (message, ticket_id, user_id, created_at) VALUES (?, ?, ?, NOW())',
      [message, ticket_id, user_id]
    );
    res.status(201).json({ message: 'Comment created', commentId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCommentsByTicket, createComment };
