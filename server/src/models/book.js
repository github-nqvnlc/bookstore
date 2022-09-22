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

           Book.belongsTo(models.Category, { foreignKey: "categoryId", as: "categoryData" });
            // Book.belongsTo(models.Type, { foreignKey: "typeId", as: "typeData" });
            // Book.belongsTo(models.Author, { foreignKey: "authorId", as: "authorData" });
            // Book.belongsTo(models.Publisher, { foreignKey: "publisherId", as: "publisherData" });

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
            image: DataTypes.BLOB('long'),
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
