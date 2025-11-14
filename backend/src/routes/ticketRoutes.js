// backend/src/routes/ticketRoutes.js

const express = require('express');
const router = express.Router();
const { getAllTickets, getTicketById, createTicket } = require('../controllers/ticketController');

// 1. (เพิ่มใหม่!) Import middleware เข้ามา
const authMiddleware = require('../middleware/authMiddleware');

// 2. (แก้ไข!) เปลี่ยนเส้นทาง GET / ให้ใช้ middleware ด้วย
// (ปกติทุกคนควรดู ticket ได้ แต่ถ้าจะให้ดี เฉพาะคนที่ login แล้วเท่านั้น)
router.get('/', authMiddleware(), getAllTickets);

// 3. (แก้ไข!) เปลี่ยนเส้นทาง GET /:id ให้ใช้ middleware ด้วย
router.get('/:id', authMiddleware(), getTicketById);

// 4. (สำคัญที่สุด!) เพิ่ม middleware ให้เส้นทาง POST /
// authMiddleware() จะรัน "ยาม" ก่อนที่จะรัน createTicket
router.post('/', authMiddleware(), createTicket); 

module.exports = router;