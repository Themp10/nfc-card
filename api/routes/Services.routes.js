
const express = require("express");
const router = express.Router();
const services = require("../controllers/Services.controller.js");
const { multerMiddleware,authJwt }=require("../middleware")

  router.post("/",multerMiddleware.single('image'),services.createOne);
  router.get("/",authJwt.verifyToken,services.findAll);
  router.get("/:id_card",services.findOne);
  // router.get("/count/:id_user",services.countServices);
  router.patch("/:id_card", services.updateOne);
  router.delete("/:id_user/:id_card",services.RemoveOne);
  // router.get("/countServices/:id_user", services.countServicesForCard);
  

module.exports = router;
