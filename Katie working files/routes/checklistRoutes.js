// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the checklist
  app.get("/api/checklist", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Checklist.findAll({}).then(function(dbChecklist) {
      // We have access to the checklist as an argument inside of the callback function
      res.json(dbChecklist);
    });
  });

  // POST route for saving a new checklist
  app.post("/api/checklist", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Checklist.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbChecklist) {
      // We have access to the new checklist as an argument inside of the callback function
      res.json(dbChecklist);
    });
  });

  // DELETE route for deleting checklist. We can get the id of the checklist to be deleted from
  // req.params.id
  app.delete("/api/checklist/:id", function(req, res) {
    // We just have to specify which checklist we want to destroy with "where"
    db.Checklist.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbChecklist) {
      res.json(dbChecklist);
    });

  });

  // PUT route for updating checklist. We can get the updated checklist data from req.body
  app.put("/api/checklist", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Checklist.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbChecklist) {
      res.json(dbChecklist);
    });
  });

};
