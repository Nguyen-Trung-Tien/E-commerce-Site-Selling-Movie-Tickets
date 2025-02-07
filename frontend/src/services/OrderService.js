import axios from "axios";

export const createOrder = async (data, access_token) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/create`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

export const getOrderByUserId = async (id, access_token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/get-order-details/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {}
};
