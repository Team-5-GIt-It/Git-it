//search by event
module.exports = function(sequelize, DataTypes) {
    var SearchEvent = sequelize.define("SearchEvent", {
      name: DataTypes.STRING
    });
  
    SearchEvent.associate = function(models) {
      SearchEvent.hasMany(models.Event, {
        onDelete: "cascade"
      });
    };
  
    return Search;
  };
  