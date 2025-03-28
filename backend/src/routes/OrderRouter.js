const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", OrderController.createOrder);
router.get("/get-order-details/:id", OrderController.getDetailsOrder);

module.exports = router;
