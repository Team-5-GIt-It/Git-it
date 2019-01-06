module.exports = function(sequelize, DataTypes) {
  var CreateNewEvent = sequelize.define("New Event", {
    event_name: DataTypes.STRING,
    host_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    location: DataTypes.STRING,
    details: DataTypes.TEXT
  });
  return CreateNewEvent;
};