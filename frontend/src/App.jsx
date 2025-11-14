// frontend/src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// 1. (แก้ไข) เปลี่ยน 'login.jsx' เป็น 'Login.jsx' (L พิมพ์ใหญ่)
// import LoginPage from './views/Login.jsx' 

function App() {
  return (
    <Routes>
      {/* 2. บอกว่าหน้าแรก "/" ให้ไปที่ LoginPage */}
      <Route path="/" element={<LoginPage />} /> 
    </Routes>
  )
}

export default App