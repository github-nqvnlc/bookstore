"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {

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
            bookId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("Orders");
    },
};
