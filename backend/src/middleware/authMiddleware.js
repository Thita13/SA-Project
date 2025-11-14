// ตรวจสอบการยืนยันตัวตนของผู้ใช้
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// middleware สำหรับตรวจสอบ token และ role
const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
        //ตรวจสอบ role ถ้ามีการระบุ requiredRole
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
