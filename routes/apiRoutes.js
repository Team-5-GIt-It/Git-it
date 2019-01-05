var db = require("../models");

module.exports = function(app) {
  app.get("/api/events/:eventCode", function(req, res) {
    db.Event.findOne({
      where: {
        eventCode: req.params.eventCode
      }
    })
      //what is the dbPost here??
      .then(function(eventData) {
        res.json(eventData);
      });
  });
  // Get all examples
  app.get("/api/events", function(req, res) {
    db.Event.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // POST route for saving a new post
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    db.Event.create({
      name: req.body.name,
      event: req.body.event,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      date: req.body.date,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      groupSize: req.body.groupSize,
      eventType: req.body.eventType,
      description: req.body.description,
      eventCode: req.body.address
    }).then(function(eventData) {
      res.json(eventData);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
