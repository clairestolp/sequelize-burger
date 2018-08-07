'use strict';

module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define('Customer', {
        customer_name: {
            type: DataTypes.STRING
        }
    });

    Customer.associate = function (models) {
        models.Customer.hasMany(models.Burger);
    };

    return Customer;
};