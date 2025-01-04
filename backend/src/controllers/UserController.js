const UserService = require("../service/UserService");

const createUser = async (req, res) => {
  try {
    // api đăng ký tài khoản
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "error",
        message: "Please fill all the fields",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "error",
        message: "The input is email",
      });
    } else if (password.length < 8) {
      return res.status(200).json({
        status: "error",
        message: "Password must be at least 8 characters",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "Password and Confirm Password must be the same",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    // api đăng ký tài khoản
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "error",
        message: "Please fill all the fields",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "error",
        message: "The input is email",
      });
    } else if (password.length < 8) {
      return res.status(200).json({
        status: "error",
        message: "Password must be at least 8 characters",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "Password and Confirm Password must be the same",
      });
    }
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
module.exports = { createUser, loginUser };
