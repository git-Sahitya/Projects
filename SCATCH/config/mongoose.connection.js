const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("development:mongoose");
mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(() => debug("Connected"))
  .catch((err) => debug(err));

module.exports = mongoose.connection;

// for run  write this code in terminal

// $env:DEBUG="development:*"

// for stop to print   write this code in terminal

//  Remove-item env:DEBUG


//netstat -ano | findstr :3000
//taskkill /PID 16036 /F