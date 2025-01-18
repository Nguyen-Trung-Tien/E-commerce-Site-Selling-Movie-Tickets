const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct); // authMiddleware
router.get(
  "/get-details/:id",
  authMiddleware,
  ProductController.getDetailsProduct
);
router.delete("/delete/:id", ProductController.deleteProduct);
router.get("/get-all", ProductController.getAllProduct);
router.post(
  "/delete-many",
  authMiddleware,
  ProductController.deleteManyProduct
); // authMiddleware

module.exports = router;
