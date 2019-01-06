//create event
module.exports = function(sequelize, DataTypes) {
    var NewEvent = sequelize.define("NewEvent", {
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
  
    NewEvent.associate = function(models) {
      NewEvent.belongsTo(models.SearchEvent, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return NewEvent;
  };
  