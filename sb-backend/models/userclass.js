module.exports = function (sequelize, DataTypes) {
    var UserClass = sequelize.define("UserClass", {})

    UserClass.associate = function (models) {
        models.UserClass.belongsTo(models.User )
        models.UserClass.belongsTo(models.Class )
    }
    return UserClass
}
