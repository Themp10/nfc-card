const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token,x-access-user_id, Origin, Content-Type, Accept"
    );
    next();
  });
  router.post("/login", controller.login);
  router.post("/checkpass", controller.checkpass);
  router.post("/logout", controller.logout);
  router.patch("/updatepassword", controller.updatePassword)
  router.get("/:id_user",authJwt.verifyToken,controller.verifyToken);

module.exports = router;