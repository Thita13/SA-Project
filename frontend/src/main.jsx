// frontend/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import LoginPage from './views/Login.jsx';

// 1. (สำคัญ!) Import BrowserRouter
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. (สำคัญ!) หุ้ม <App /> ด้วย <BrowserRouter> */}
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  </React.StrictMode>,
)