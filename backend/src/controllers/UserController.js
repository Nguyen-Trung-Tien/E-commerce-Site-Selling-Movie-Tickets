const { get } = require("../router/UserRoute");

const UserService = require("../service/UserService");
const JwtService = require("../service/JwtService");

const createUser = async (req, res) => {
  try {
    // api đăng ký tài khoản
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.]?\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "error",
        message: "The user is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers;
    if (!userId) {
      return res.status(200).json({
        status: "error",
        message: "The user is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers;
    if (!userId) {
      return res.status(200).json({
        status: "error",
        message: "The user is required",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.slipt(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "error",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenService(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
};
