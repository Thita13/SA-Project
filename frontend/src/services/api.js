// src/services/api.js
import axios from 'axios';

// สร้าง instance ของ axios
const api = axios.create({
  // URL ของ backend ที่คุณรันไว้ (จากไฟล์ .env)
  baseURL: 'http://localhost:5000/api', 
});

// (ขั้นสูง) เพิ่ม Interceptor เพื่อแนบ Token ไปกับทุก request
// หลังจากนี้ เวลาคุณยิง API มันจะเอา Token จาก localStorage ไปด้วย
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // เราจะเก็บ token ไว้ในนี้ตอน login
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;