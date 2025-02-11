const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const ejs = require('ejs')

// from this code --> require('dotenv').config()  all variables in .env file we will use in config by process.env.filename

require("dotenv").config();

const ownersRouter = require("./routes/ownersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const indexRouter = require("./routes/index");

const db = require("./config/mongoose.connection.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
