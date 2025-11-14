// src/app.js - กำหนด middleware และ route ของ app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(cors()); // อนุญาตให้ request จาก frontend
app.use(bodyParser.json()); // อ่าน JSON body จาก request

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', commentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('IT Support Ticket Backend is running');
});

module.exports = app;
