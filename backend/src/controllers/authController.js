// จัดการ login และ token
const db = require('../config/db');
const { generateToken } = require('../utils/token');

// POST /api/auth/login
const login = async (req, res) => {
  const { name_user, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT id, name_user, password, role FROM users WHERE name_user = ?',
      [name_user]
    );

    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: rows[0].id, role: rows[0].role });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
