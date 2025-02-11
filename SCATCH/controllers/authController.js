const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "You are already have an account");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/shop");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });

  if (!user) return res.send("Email or password incorrect");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
  });
};
