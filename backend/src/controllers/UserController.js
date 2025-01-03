const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body);
    return res.status(200).json({
      message: result,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { createUser };
