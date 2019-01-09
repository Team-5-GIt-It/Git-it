var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Event.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load index page
  app.get("/event", function(req, res) {
    db.Event.findAll({}).then(function(dbExamples) {
      res.render("event", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/event/:eventCode", function(req, res) {
    db.Event.findOne({
      where: {
        eventCode: req.params.eventCode
      },
      include: [db.Checklist]
    }).then(function(data) {
      res.render("event", {
        eventData: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

