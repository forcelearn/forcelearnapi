var express = require("express");
var bodyParser = require("body-parser");
var nforce = require("nforce");
var env = require('dotenv').config();

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//nforce setup - change clientId, clientSecret, redirectUri(for not username/password flow) as per your org/app
var org = nforce.createConnection({
  clientId: "3MVG9d8..z.hDcPIZTq8HIWLxdT3vQeQLKjEBwwsVsAeunwe4p_7qkJnOn1efxgH39ADzORugATQdmJ0RapFG",
  clientSecret: "09D1C02CAB07230E80F8FCFAEC6B595D8D3C26EFA9303A96C1A9CFF7BBB9D31C",
 // redirectUri: "https://seanstack.herokuapp.com/oauth/_callback",
  redirectUri: "https://localhost:3000",
  apiVersion: "v37.0",
  environment: "production",
  mode: "single"
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

//change username, password+securitytoken as per your org
app.get("/contacts", function(req, res) {
  org.authenticate({ username: 'forcelearn@gmail.com', password: 'S@bunnysunny7Oi8uxvfAAEnZUkj2xfSJt6Y3'}, function(err, oauth){
    if(err) {
      console.log('Error: ' + err.message);
    } else {
      org.query({query:"SELECT id,Country__c,Confirmed__c,Deaths__c,Recovered__c FROM Corona__c"}, function (err, resp) {
        if(err) throw err;
        if(resp.records && resp.records.length){
          res.send(resp.records);
        }
      });
    }
  });
});

app.get("/qa", function(req, res) {
    org.authenticate({ username: 'forcelearn@gmail.com', password: 'S@bunnysunny7Oi8uxvfAAEnZUkj2xfSJt6Y3'}, function(err, oauth){
      if(err) {
        console.log('Error: ' + err.message);
      } else {
        org.query({query:"SELECT Id,Name,Question__c,Answer__c,Type__c FROM Q_A__c"}, function (err, resp) {
          if(err) throw err;
          if(resp.records && resp.records.length){
            res.send(resp.records);
          }
        });
      }
    });
  });

  app.get("/post", function(req, res) {
    org.authenticate({ username: 'forcelearn@gmail.com', password: 'S@bunnysunny7Oi8uxvfAAEnZUkj2xfSJt6Y3'}, function(err, oauth){
      if(err) {
        console.log('Error: ' + err.message);
      } else {
        org.query({query:"SELECT Content1__c,Content2__c,Content3__c,Content4__c,Content5__c,Content6__c,Content7__c,Content8__c,Content9__c,Content10__c,Content11__c,Content12__c,Content13__c,Content14__c,Content15__c,Content_Image1__c,Content_Image2__c,Content_Image3__c,Content_Image4__c,Content_Image5__c,Content_Image6__c,Content_Image7__c,Content_Image8__c,Content_Image9__c,Content_Image10__c,Content_Image11__c,Content_Image12__c,Content_Image13__c,Content_Image14__c,Content_Image15__c,Count__c,Description__c,Id,Name,Title_Image__c,Title__c FROM BlogPost__c"}, function (err, resp) {
          if(err) throw err;
          if(resp.records && resp.records.length){
            res.send(resp.records);
          }
        });
      }
    });
  });

