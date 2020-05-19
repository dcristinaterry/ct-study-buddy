module.exports = function (sequelize, DataTypes) {
    var UserSession = sequelize.define("UserSession", {})

    UserSession.associate = function (models) {
        models.userSession.belongsTo(models.User)
        models.userSession.belongsTo(models.Session)
    }
    return UserSession
}
