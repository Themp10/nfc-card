
const express = require("express");
const router = express.Router();
const galerie = require("../controllers/galerie.controller.js");
const { multerMiddleware,authJwt }=require("../middleware")

  router.post("/",multerMiddleware.single('image'),galerie.createOne);
  router.get("/",authJwt.verifyToken,galerie.findAll);
  router.get("/:id_card",galerie.findOne);
  router.delete("/:id_user/:id_card",galerie.RemoveOne);
  

module.exports = router;
