// backend/server.js
const dotenv = require('dotenv');

// 1. (สำคัญมาก!) โหลด .env ก่อนใครเพื่อน
dotenv.config();

// 2. Import 'app' ที่ config เสร็จสมบูรณ์แล้วจาก src/app.js
const app = require('./src/app');

// 3. ดึง Port มาจาก .env
const PORT = process.env.PORT || 5000;

// 4. สั่งให้ 'app' เริ่มฟัง (listen)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});