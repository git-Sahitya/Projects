const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners.model.js")

router.get("/", (req,res) => {
  res.send("Router Working!!");
});

module.exports = router;
