const express = require('express');
const router = express.Router();
const { getCommentsByTicket, createComment } = require('../controllers/commentController');

// ดึง comment ของ ticket
router.get('/:ticketId', getCommentsByTicket);

// สร้าง comment ใหม่
router.post('/', createComment);

module.exports = router;
