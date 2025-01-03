const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load các biến môi trường từ file .env
dotenv.config();

// Tạo kết nối với MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Kiểm tra kết nối
db.connect((err) => {
  if (err) {
    console.error("Không thể kết nối tới MySQL:", err.message);
    return;
  }
  console.log("Kết nối thành công tới MySQL!");
});

module.exports = db;
