const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners.model.js");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();

    if (owners.length > 0) {
      return res
        .status(503)
        .send("You don't have permission to create a new owner. ");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/admin", (req, res) => {
  res.render("createproducts")
});



module.exports = router;




//console.log((process.env.NODE_ENV));


// set node environment

//  $env:NODE_ENV="development"
