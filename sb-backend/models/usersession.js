module.exports = function (sequelize, DataTypes) {
    var UserSession = sequelize.define("UserSession", {})

    UserSession.associate = function (models) {
        models.UserSession.belongsTo(models.User)
        models.UserSession.belongsTo(models.Session)
    }
    return UserSession
}
