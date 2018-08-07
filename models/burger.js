'use strict';

module.exports = function (sequelize, DataTypes) {
    const Burger = sequelize.define('Burger', {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Burger.associate = function (models) {
        models.Burger.belongsTo(models.Customer, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Burger;
}