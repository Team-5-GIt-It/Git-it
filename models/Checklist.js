//List Items
module.exports = function(sequelize, DataTypes) {
  var Checklist = sequelize.define("Checklist", {
    name: DataTypes.STRING,
    itemText: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    EventId: DataTypes.INTEGER
  });

  Checklist.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Checklist.belongsTo(models.Event, {
      EventId: {
        allowNull: false
      }
    });
  };

  return Checklist;
};
