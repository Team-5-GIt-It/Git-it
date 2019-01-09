module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Event", {
    event_name: DataTypes.STRING,
    host_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    location: DataTypes.STRING,
    details: DataTypes.TEXT
  });

  Events.associate = function(models) {
    // Associating Events with Checklist
    // When an Event is deleted, also delete any associated Checklist
    Events.hasOne(models.Checklist, {
      onDelete: "cascade"
    });

  return Events;
};