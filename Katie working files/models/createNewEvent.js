module.exports = function(sequelize, DataTypes) {
    var NewEvent = sequelize.define("NewEvent", {
      event: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      host: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      date: {
        // type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      time: {
        // type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    });
    return NewEvent;
  };