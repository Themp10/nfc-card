const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller.js");
const { multerMiddleware, authJwt } = require("../middleware");


  router.post("/",users.createOne);
  router.get("/",authJwt.verifyToken,users.findAll);
  router.get("/:id_user",authJwt.verifyToken,users.findOne);
  router.patch("/user/:id_user",multerMiddleware.single('image') ,users.updateOne);
  router.delete("/:id_item",authJwt.verifyToken,users.RemoveOne);
  router.get('/verify/:verificationToken', users.verifyEmail);




  module.exports = router;

