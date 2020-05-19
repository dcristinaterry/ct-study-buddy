// Creating our location model
module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        // The email cannot be null, and must be a proper email before creation
        building: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false
        },
        maxOccupancy:{
            type: DataTypes.STRING,
            allowNull: false
        },
        utilities:{
            type: DataTypes.STRING,
        }
    });

    Location.associate = function(models) {
        models.Location.hasMany(models.Sessions)
    }
    return Location;
}