const express = require('express');
const router = express.Router();
// 1. (แก้ไข) import 'register' เพิ่มเข้ามาจาก authController
const { login, register } = require('../controllers/authController');

// 2. กำหนดเส้นทางสำหรับ login
router.post('/login', login);

// 3. (เพิ่มใหม่) กำหนดเส้นทางสำหรับ register
router.post('/register', register);

module.exports = router;
