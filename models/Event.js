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
    eventCode: DataTypes.STRING
  });

//   Event.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     Event.hasMany(models.Item, {
//       onDelete: "cascade"
//     });
//   };

  return Event;
};
