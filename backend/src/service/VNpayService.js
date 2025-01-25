const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const MERCHANT_CODE = process.env.MERCHANT_CODE;
const SECRET_KEY = process.env.SECRET_KEY;
const VNPAY_URL = process.env.VNPAY_URL;

const createPaymentUrl = (amount, orderInfo, returnUrl, ipAddress) => {
  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: MERCHANT_CODE,
    vnp_Amount: amount * 100, // VNPay yêu cầu số tiền tính theo đồng
    vnp_CurrCode: "VND",
    vnp_TxnRef: Date.now(),
    vnp_OrderInfo: orderInfo,
    vnp_Locale: "vn",
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddress,
  };

  // Sắp xếp các tham số theo thứ tự từ điển và mã hóa
  const querystring = Object.keys(vnp_Params)
    .sort()
    .map((key) => `${key}=${vnp_Params[key]}`)
    .join("&");

  const signData = SECRET_KEY + querystring;
  const secureHash = crypto.createHash("sha512").update(signData).digest("hex");

  vnp_Params.vnp_SecureHash = secureHash;

  const vnpUrl = VNPAY_URL + "?" + new URLSearchParams(vnp_Params).toString();
  return vnpUrl;
};

const validateResponse = (vnp_Params) => {
  const secureHash = vnp_Params.vnp_SecureHash;
  const signData =
    SECRET_KEY +
    Object.keys(vnp_Params)
      .filter((key) => key !== "vnp_SecureHash")
      .sort()
      .map((key) => `${key}=${vnp_Params[key]}`)
      .join("&");

  const generatedHash = crypto
    .createHash("sha512")
    .update(signData)
    .digest("hex");

  return secureHash === generatedHash;
};

module.exports = { createPaymentUrl, validateResponse };
