import axios from "axios";

export const getConfig = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/payment/config`
  );
  return res.data;
};

export const createPaymentUrl = async (paymentData) => {
  const response = await axios.post(
    "/api/payment/create_payment_url",
    paymentData
  );
  return response.data;
};
