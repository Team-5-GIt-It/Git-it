module.exports = function(sequelize, DataTypes) {
    var Checklist = sequelize.define("Checklist", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });

    Checklist.associate = function(models) {
      // We're saying that a Checklist should belong to an Event
      // A Checklist can't be created without an Event due to the foreign key constraint
      Checklist.belongsTo(models.Events, {
        foreignKey: {
          allowNull: false
        }
      });

    return Checklist;
  };
  