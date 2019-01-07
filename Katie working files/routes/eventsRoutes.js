var db = require("../models");

module.exports = function(app) {

// get route for all events
  app.get("/api/events/", function(req, res) {
    db.Events.findAll({})
      .then(function(dbEvents) {
        res.json(dbEvents);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/events/:id", function(req, res) {
    db.Events.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbEvents) {
        res.json(dbEvents);
      });
  });

  // POST route for saving a new event
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    db.Events.create({
      event_name: req.body.event_name,
      host_name: req.body.host_name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      details: req.body.details
    })
      .then(function(dbEvents) {
        res.json(dbEvents);
      });
  });

  // DELETE route for deleting events
  app.delete("/api/events/:id", function(req, res) {
    db.Events.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbEvents) {
        res.json(dbEvents);
      });
  });

  // PUT route for updating events
  app.put("/api/events", function(req, res) {
    db.Events.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbEvents) {
        res.json(dbEvents);
      });
  });
};