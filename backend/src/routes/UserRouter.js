const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/authMiddleware");
router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.post("/log-out", UserController.logoutUser);
router.post("/refresh-token", UserController.refreshToken);
router.put("/update-user/:id", authMiddleware, UserController.updateUser); // authUserMiddleware
router.delete("/delete-user/:id", UserController.deleteUser); // authMiddleware
// router.post("/delete-many", authMiddleware, UserController.deleteManyUser); // authMiddleware
router.get("/getAll", authMiddleware, UserController.getAllUser); // authMiddleware
router.get("/get-details/:id", UserController.getDetailsUser); // authUserMiddleware

module.exports = router;
