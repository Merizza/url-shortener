var path = require('path');
var express = require("express");

var index = require("./routes/index");
var link = require("./routes/link");

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname, "public")));

//Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", index);
app.use("/link", link);


app.listen(port, function() {
  console.log("Server is up on port " + port);
  console.log(process.env.NODE_ENV);
});

module.exports = app;
