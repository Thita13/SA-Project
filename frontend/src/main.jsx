// frontend/src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'

import LoginPage from './views/Login.jsx'
import Detail from './views/Staff/Detail.jsx'
import MyAssign from './views/Staff/My_Assign.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main routes for views (defined in main.jsx per project convention) */}
        {/* Root renders Login page */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/assign" element={<MyAssign />} />
        <Route path="/assign/detail/:ticketId" element={<Detail />} />
        {/* Fallback: redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)