
const express = require("express");
const router = express.Router();
const services = require("../controllers/Services.controller.js");
const { multerMiddleware,authJwt }=require("../middleware")

  router.post("/",multerMiddleware.single('image'),services.createOne);
  router.get("/",authJwt.verifyToken,services.findAll);
  router.get("/:id_card",authJwt.verifyToken,services.findOne);
  router.get("/count/:id_user",services.countServices);
  router.patch("/:id_card", services.updateOne);
  router.delete("/:id_card",services.RemoveOne);
  



  module.exports = router;
