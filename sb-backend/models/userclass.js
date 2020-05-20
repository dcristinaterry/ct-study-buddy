module.exports = function (sequelize, DataTypes) {
    var UserClass = sequelize.define("UserClass", {})

    UserClass.associate = function (models) {
        models.userClass.belongsTo(models.User, { as : "userId"})
        models.userClass.belongsTo(models.Class, { as : "classId"})
    }
    return UserClass
}
