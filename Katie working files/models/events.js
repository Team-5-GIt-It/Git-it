module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Event", {
    event_name: DataTypes.STRING,
    host_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    location: DataTypes.STRING,
    details: DataTypes.TEXT
  });
  return Events;
};