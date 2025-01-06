const express = require("express");

const router = (app) => {
  const apiRouter = express.Router();

  // Define your routes here
  apiRouter.get("/", (req, res) => {
    res.send("API is running...");
  });

  app.use("/api", apiRouter);
};

module.exports = router;
