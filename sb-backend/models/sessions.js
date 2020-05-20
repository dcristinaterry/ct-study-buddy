// Creating our Sessions model
module.exports = function (sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        // The email cannot be null, and must be a proper email before creation
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        participants: {
            type: DataTypes.STRING
        }
    })


    Session.associate = function (models) {
        models.session.belongsTo(models.User, { as: "host" })
        models.session.hasMany(models.UserSession, { onDelete: 'cascade' })
        models.session.belongsTo(models.Class, { as : "studygroup"});
        models.session.belongsTo(models.Locations, { as : "studysesion" });
        models.session.hasMany(models.Comments, { as: "comment" });
    }
    return Session;
}