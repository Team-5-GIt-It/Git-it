// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/checklists/:eventId", function(req, res) {
    db.Checklist.findAll({
      where: {
        EventId: req.params.eventId
      },
      include: [db.Event]
    }).then(function(checklistData) {
      res.json(checklistData);
    });
  });

  // POST route for saving a new post
  app.post("/api/checklists", function(req, res) {
    db.Checklist.create({
      name: req.body.name,
      itemText: req.body.itemText,
      completed: req.body.completed,
      EventId: req.body.eventId
    }).then(function(checklistData) {
      res.json(checklistData);
    });
  });

  // PUT route for updating posts
  app.put("/api/checklists/:eventId", function(req, res) {
    db.Checklist.update(
      { completed: req.body.complete },
      {
        where: {
          eventId: req.body.eventId,
          id: req.body.id
        }
      }
    ).then(function(checklistData) {
      res.json(checklistData);
    });
  });
};
