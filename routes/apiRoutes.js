var db = require("../models");

module.exports = function(app) {
  app.get("/api/events/:eventCode", function(req, res) {
    db.Event.findOne({
      where: {
        eventCode: req.params.eventCode
      }
    })
      .then(function(eventData) {
        res.json(eventData);
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
      attire: req.body.attire,
      description: req.body.description,
      eventCode: req.body.eventCode
    }).then(function(eventData) {
      res.json(eventData);
    });

};
