const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
  res.send("usersRouter Working!!");
});

module.exports = router;
