"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Oders", {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            createOn: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            createBy: {
                type: Sequelize.STRING,
            },
            totalPrice: {
                type: Sequelize.FLOAT,
            },
            shippingAddress: {
                type: Sequelize.STRING,
            },
            shippingPhone: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Oders");
    },
};
