// src/services/authService.js
import api from './api';

// ฟังก์ชันสำหรับ Login
const login = async (name_user, password) => {
  // ยิงไปที่ POST /api/auth/login
  const response = await api.post('/auth/login', {
    name_user,
    password,
  });
  
  // ถ้า login สำเร็จ และได้ token กลับมา
  if (response.data.token) {
    // เก็บ token ไว้ใน localStorage
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// ฟังก์ชันสำหรับ Register
const register = async (name_user, password, role) => {
  // ยิงไปที่ POST /api/auth/register
  const response = await api.post('/auth/register', {
    name_user,
    password,
    role: role || 'user',
  });
  
  // ถ้า register สำเร็จ และได้ token กลับมา
  if (response.data.token) {
    // เก็บ token ไว้ใน localStorage (เพื่อให้ login อัตโนมัติ)
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// ฟังก์ชันสำหรับ Logout
const logout = () => {
  localStorage.removeItem('token');
};

export default {
  login,
  register,
  logout,
};