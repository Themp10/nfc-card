
const express = require("express");
const router = express.Router();
const bs_hours = require("../controllers/bs_hours.controller.js");

//   router.post("/", bs_hours.createOne);
  router.get("/:id_card",bs_hours.findOne);
  router.patch("/:id_card", bs_hours.updateOne);
  

module.exports = router;
