var express = require("express");
var mongo = require("mongodb");
var url = "mongodb://localhost:27017/url";

var router = express.Router();

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/:newlink", function(req, res) {
  var newlink = req.params.newlink;
  mongo.connect(url, function(err, db) {
    if(err) throw err;
    db.collection('links').findOne({
      "shortlink": newlink
    }, function(err, data) {
      if(err) throw err;
      res.redirect(data.url);
    });
  });
});

module.exports = router;