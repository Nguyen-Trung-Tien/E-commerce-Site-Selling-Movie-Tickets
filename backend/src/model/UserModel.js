const db = require("../config/dbConfig");

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
      phone VARCHAR(20) NOT NULL,
      accessToken VARCHAR(255) NOT NULL,
      refreshToken VARCHAR(255) NOT NULL
    )
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error creating User table:", err.message);
    } else {
      console.log("User table created successfully");
    }
  });
};

module.exports = createUserTable;
