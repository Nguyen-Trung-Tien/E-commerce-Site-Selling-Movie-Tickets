const Order = require("../model/OderProduct");
const Product = require("../model/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      isPaid,
      paidAt,
    } = newOrder;
    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: { countInStock: -order.amount, selled: +order.amount },
          },
          { new: true }
        );
        if (!productData) {
          return order.product;
        }
        return null;
      });

      const results = await Promise.all(promises);
      const failedProducts = results.filter((item) => item !== null);

      if (failedProducts.length) {
        resolve({
          status: "ERR",
          message: `San pham ${failedProducts.join(",")} khong du`,
        });
      } else {
        const createdOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            city,
            phone,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: user,
          isPaid,
          paidAt,
        });
        if (createdOrder) {
          resolve({
            status: "OK",
            message: "SUCCESS",
          });
        } else {
          resolve({
            status: "ERR",
            message: "Failed to create order",
          });
        }
      }
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message,
      });
    }
  });
};

const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findOne({
        user: id,
      });
      if (order === null) {
        resolve({
          status: "OK",
          message: "The order is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getDetailsOrder,
};
