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
            Book.hasMany(models.Order, { foreignKey: "bookId", as: "bookData" })

            Book.belongsTo(models.Catalog, { foreignKey: "catalogId", as: "catalogData" });
            Book.belongsTo(models.Category, { foreignKey: "categoryId", as: "categoryData" });
            Book.belongsTo(models.Type, { foreignKey: "typeId", as: "typeData" });
            Book.belongsTo(models.Author, { foreignKey: "authorId", as: "authorData" });
            Book.belongsTo(models.Publisher, { foreignKey: "publisherId", as: "publisherData" });

        }
    }
    Book.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT('long'),
            price: DataTypes.FLOAT,
            discount: DataTypes.FLOAT,
            quantity: DataTypes.INTEGER,
            vote: DataTypes.INTEGER,
            image: DataTypes.BLOB('long'),
            authorId: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
            catalogId: DataTypes.INTEGER,
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
