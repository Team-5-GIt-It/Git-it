var db = require("../models");

module.exports = function(app) {

// get route for all events
  app.get("/api/events/", function(req, res) {
    db.NewEvent.findAll({})
      .then(function(dbNewEvent) {
        res.json(dbNewEvent);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/events/:id", function(req, res) {
    db.NewEvent.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbNewEvent) {
        res.json(dbNewEvent);
      });
  });

  // POST route for saving a new event
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    db.NewEvent.create({
      event name: req.body.eventname,
      host name: req.body.hostname,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      details: req.body.details
    })
      .then(function(dbNewEvent) {
        res.json(dbNewEvent);
      });
  });

  // DELETE route for deleting events
  app.delete("/api/events/:id", function(req, res) {
    db.NewEvent.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbNewEvent) {
        res.json(dbNewEvent);
      });
  });

  // PUT route for updating events
  app.put("/api/events", function(req, res) {
    db.NewEvent.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbNewEvent) {
        res.json(dbNewEvent);
      });
  });
};