import axios from "axios";

export const getConfig = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/payment/config`
  );
  return res.data;
};

export const vnpay = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/payment/vnpay`
  );
  return res.data;
};

export const vnpay_return = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/payment/vnpay_return`
  );
  return res.data;
};
