 // Get route for retrieving a single post
  app.get("/api/events/:eventCode", function(req, res) {
    db.Event.findOne({
      where: {
        eventCode: req.params.eventCode
      }
    })
    //what is the dbPost here??
      .then(function(dbPost) {
        res.json(dbPost);
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
      eventCode: req.body.address,
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/events/:eventCode", function(req, res) {
    db.Event.destroy({
      where: {
        eventCode: req.params.eventCode
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });


  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });


  // Need to include routes for individual Event lists -- need to look at blog example

  



  ////////////MODELS//////////////

  //Event

  //NEEDS SERVER-SIDE VERIFICATION
  module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
      // Giving the Event model a name of type STRING
      name: DataTypes.STRING,
      event: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      timeStart: DataTypes.TIME,
      timeEnd: DataTypes.TIME,
      groupSize: DataTypes.STRING,
      eventType: DataTypes.STRING,
      description: DataTypes.TEXT,
      eventCode: DataTypes.STRING,
    });
  
    Event.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Event.hasMany(models.Item, {
        onDelete: "cascade"
      });
    };
  
    return Event;
  };

  //List Items
  module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Item.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Item.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };
