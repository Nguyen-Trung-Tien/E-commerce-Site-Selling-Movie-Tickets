const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const router = require("./router");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
router(app);
app.use(bodyParser.json());
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
