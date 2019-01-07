// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  app.get("/eventscms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/createEvent.html"));
  });

  // events route loads events.html
  app.get("/events", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/events.html"));
  });

  // checklist route loads checklist.html
  app.get("/checklist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/checklist.html"));
  });

};
