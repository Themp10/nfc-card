
const express = require("express");
const router = express.Router();
const commandes = require("../controllers/commandes.controller.js");
const { authJwt }=require("../middleware")

  router.post("/",authJwt.verifyToken,commandes.createOne);
  router.get("/:id_user",authJwt.verifyToken,commandes.findAll);
  router.get("/card/:id_card",authJwt.verifyToken,commandes.findOne);
  router.patch("/:id_card", commandes.updateOne);
  router.delete("/:id_card",commandes.RemoveOne);
  router.post("/send-email", commandes.sendOrderConfirmationEmail)

module.exports = router;