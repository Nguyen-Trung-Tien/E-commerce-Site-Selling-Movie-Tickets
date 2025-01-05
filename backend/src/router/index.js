const UserRouter = require("./UserRoute");
const ProductRouter = require("./ProductRoute");
const router = (app) => {
  app.use("/api/users", UserRouter);
  app.use("/api/products", ProductRouter);
};

module.exports = router;
