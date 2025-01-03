const db = require("../config/dbConfig");

// Lấy danh sách phim
exports.getMovies = (req, res) => {
  const sql = "SELECT * FROM movies";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi lấy danh sách phim." });
    }
    res.status(200).json(results);
  });
};

// Thêm phim mới
exports.addMovie = (req, res) => {
  const { title, genre, director, release_date } = req.body;
  const sql =
    "INSERT INTO movies (title, genre, director, release_date) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, genre, director, release_date], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi thêm phim mới." });
    }
    res
      .status(201)
      .json({ message: "Thêm phim thành công!", movieId: result.insertId });
  });
};
