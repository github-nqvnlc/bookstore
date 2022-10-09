"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Books", {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT('long'),
            },
            price: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            discount: {
                type: Sequelize.FLOAT,
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            vote: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.BLOB('long'),
                allowNull: true
            },
            authorId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },

            publisherId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            typeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            catalogId: {
                allowNull: false,
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
        await queryInterface.dropTable("Books");
    },
};
