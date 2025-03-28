const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");

exports.createPaymentUrl = async (req, res) => {
  const { orderId, amount, bankCode } = req.body;

  const tmnCode = "VI5HB68A";
  const secretKey = "K0RTQXVLHK8KHSJJZY9S40GEESWQJKVK";
  const returnUrl = "http://localhost:3000/orderSuccess";
  const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `Thanh toán đơn hàng #${orderId}`,
    vnp_OrderType: "billpayment",
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: req.ip,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  const sortedParams = qs.stringify(vnp_Params, { encode: false });

  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(sortedParams, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;
  const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params)}`;
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  return res.json({ paymentUrl });
};
