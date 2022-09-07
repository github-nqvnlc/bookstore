"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Book.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.FLOAT,
            discount: DataTypes.FLOAT,
            quantity: DataTypes.INTEGER,
            vote: DataTypes.INTEGER,
            image: DataTypes.STRING,
            authorId: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
            publisherId: DataTypes.INTEGER,
            typeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Book",
        }
    );
    return Book;
};
