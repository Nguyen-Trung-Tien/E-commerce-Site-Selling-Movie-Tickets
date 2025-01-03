const Router = require("./UserRoute");
const router = (app) => {
  app.use("/api/users", Router);
};
module.exports = router;
