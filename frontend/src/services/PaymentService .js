import axios from "axios";

export const getConfig = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/payment/config`
  );
  return res.data;
};

export const createVNPayPayment = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/payment/create_payment_url`,
    data
  );
};

// export const createZaloPayPayment = async (data) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_URL}/payment/zalopay`,
//     data
//   );
// };
