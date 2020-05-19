module.exports = function (sequelize, DataTypes) {
    var UserClass = sequelize.define("UserClass", {})

    UserClass.associate = function (models) {
        models.userClass.belongsTo(models.User)
        models.userClass.belongsTo(models.Class)
    }
    return UserClass
}
