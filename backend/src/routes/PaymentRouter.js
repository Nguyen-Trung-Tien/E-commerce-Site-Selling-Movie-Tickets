const express = require("express");
const router = express.Router();
const VNpayService = require("../service/VNpayService");
const dotenv = require("dotenv");
dotenv.config();

router.get("/config", (req, res) => {
  return res.status(200).json({
    status: "OK",
    data: process.env.CLIENT_ID,
  });
});

router.post("/vnpay", (req, res) => {
  const { amount, orderInfo, returnUrl, ipAddress } = req.body;

  // Tạo URL thanh toán VNPay
  const vnpUrl = VNpayService.createPaymentUrl(
    amount,
    orderInfo,
    returnUrl,
    ipAddress
  );

  res.json({ vnpUrl });
});

router.get("/vnpay_return", (req, res) => {
  const vnp_Params = req.query;

  if (VNpayService.validateResponse(vnp_Params)) {
    if (vnp_Params.vnp_ResponseCode === "00") {
      res.send("Payment successful");
    } else {
      res.send("Payment failed");
    }
  } else {
    res.send("Invalid payment response");
  }
});

module.exports = router;
