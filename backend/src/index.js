const express = require("express");
const dotenv = require("dotenv");
const router = require("./router");
const cors = require("cors");
dotenv.config({ path: "./src/.env" });

const db = require("./config/dbConfig");
const createProductTable = require("./model/ProductModel");
const createUserTable = require("./model/UserModel");
const router = require("./router");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create tables
createProductTable();
createUserTable();

router(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
