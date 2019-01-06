var db = require("../models");

module.exports = function(app) {

// get route for all events
  app.get("/api/events/", function(req, res) {
    db.CreateNewEvent.findAll({})
      .then(function(dbCreateNewEvent) {
        res.json(dbCreateNewEvent);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/events/:id", function(req, res) {
    db.CreateNewEvent.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbCreateNewEvent) {
        res.json(dbCreateNewEvent);
      });
  });

  // POST route for saving a new event
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    db.CreateNewEvent.create({
      event_name: req.body.event_name,
      host_name: req.body.host_name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      details: req.body.details
    })
      .then(function(dbCreateNewEvent) {
        res.json(dbCreateNewEvent);
      });
  });

  // DELETE route for deleting events
  app.delete("/api/events/:id", function(req, res) {
    db.CreateNewEvent.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbCreateNewEvent) {
        res.json(dbCreateNewEvent);
      });
  });

  // PUT route for updating events
  app.put("/api/events", function(req, res) {
    db.CreateNewEvent.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbCreateNewEvent) {
        res.json(dbCreateNewEvent);
      });
  });
};