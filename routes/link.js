var express = require("express");
var validUrl = require("valid-url");
var shortid = require('shortid');
var router = express.Router();
var mongo = require("mongodb").MongoClient;

var url;
var env = process.env.NODE_ENV;
if(env === "development") {
  url = "mongodb://localhost:27017/url";
} else {
  url = process.env.URL;
}

router.get("/:url(*)", function(req, res) {
  
  mongo.connect(url, function(err, db) {
    if(err) throw err;
    
    var param = req.params.url;
    
    //If URL valid
    if(validUrl.isUri(param)) {
      var shortlink = shortid.generate();
      db.collection('links').insert({
      "url": param,
      "shortlink": shortlink
      }, function(err, data) {
        if(err) throw err;
        res.json({
          original_url: data.ops[0].url,
          short_url: req.header('host') + "/" + data.ops[0].shortlink
        });
        db.close();
      }); 
    } else {
      //If URL is invalid
      res.json({
        error: "Your URL input is not valid"
      });
    }
    
  });
  
});


module.exports = router;