const express = require('express');
const router = express.Router();
const { getAllTickets, getTicketById, createTicket } = require('../controllers/ticketController');

// ดึง ticket ทั้งหมด
router.get('/', getAllTickets);

// ดึง ticket ตาม id
router.get('/:id', getTicketById);

// สร้าง ticket ใหม่
router.post('/', createTicket);

module.exports = router;
