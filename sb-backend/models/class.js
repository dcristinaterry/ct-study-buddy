// Creating our Class model
module.exports = function (sequelize, DataTypes) {
    var Class = sequelize.define("Class", {
        // The email cannot be null, and must be a proper email before creation
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        section: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        instructor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ta: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Class.associate = function (models) {
        models.class.hasMany(models.Sessions, { onDelete: 'cascade' });
        models.class.hasMany(models.UserClass, { onDelete: 'cascade' })
    };
    return Class;
}  
