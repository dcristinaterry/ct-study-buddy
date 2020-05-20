module.exports = function (sequelize, DataTypes) {
    var ClassSession = sequelize.define("ClassSession", {})

    ClassSession.associate = function (models) {
        models.ClassSession.belongsTo(models.Class)
        models.ClassSession.belongsTo(models.Session)
    }
    return ClassSession
}
