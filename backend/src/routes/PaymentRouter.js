const express = require("express");
const router = express.Router();
const { createPaymentUrl } = require("../controllers/vnpayController");
const dotenv = require("dotenv");
dotenv.config();

router.get("/config", (req, res) => {
  return res.status(200).json({
    status: "OK",
    data: process.env.CLIENT_ID,
  });
});

router.post("/create_payment_url", createPaymentUrl);
module.exports = router;
