const crypto = require('crypto');
const querystring = require('querystring');
const axios = require('axios');

// ...existing code...

function createVnpayPaymentUrl(orderId, amount, returnUrl) {
    const vnp_TmnCode = 'YOUR_VNPAY_TMNCODE';
    const vnp_HashSecret = 'YOUR_VNPAY_HASHSECRET';
    const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const vnp_Version = '2.1.0';
    const vnp_Command = 'pay';
    const vnp_OrderInfo = `Thanh toan don hang ${orderId}`;
    const vnp_OrderType = 'other';
    const vnp_Locale = 'vn';
    const vnp_CurrCode = 'VND';
    const vnp_TxnRef = orderId;
    const vnp_Amount = amount * 100;
    const vnp_IpAddr = '127.0.0.1'; // Replace with the actual IP address

    let vnp_Params = {
        vnp_Version,
        vnp_Command,
        vnp_TmnCode,
        vnp_Amount,
        vnp_CurrCode,
        vnp_TxnRef,
        vnp_OrderInfo,
        vnp_OrderType,
        vnp_Locale,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr,
        vnp_CreateDate: new Date().toISOString().slice(0, 19).replace(/-/g, '').replace(/T/g, '')
    };

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    return `${vnp_Url}?${querystring.stringify(vnp_Params, { encode: false })}`;
}

function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
}

// ...existing code...

module.exports = {
    createVnpayPaymentUrl
    // ...existing exports...
};
