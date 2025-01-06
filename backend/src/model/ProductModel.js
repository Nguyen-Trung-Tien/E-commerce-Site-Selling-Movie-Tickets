const db = require("../config/dbConfig");

const createProductTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Product (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      countInStock INT NOT NULL,
      rating FLOAT NOT NULL,
      type VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      image VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      quantity INT NOT NULL
    )
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error creating Product table:", err.message);
    } else {
      console.log("Product table created successfully");
    }
  });
};

module.exports = createProductTable;
