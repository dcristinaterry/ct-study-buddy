module.exports = function (sequelize, DataTypes) {
    var UserClass = sequelize.define("UserClass", {
        role: {
            type: DataTypes.STRING
        }
    })

    UserClass.associate = function (models) {
        models.UserClass.belongsTo(models.User )
        models.UserClass.belongsTo(models.Class )
    }
    return UserClass
}
