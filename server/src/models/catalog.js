"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Catalog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Catalog.hasMany(models.Book, { foreignKey: "catalogId", as: "catalogData" })

            Catalog.belongsTo(models.Category, { foreignKey: "categoryId", as: "categoryCatalogData" })
            Catalog.hasOne(models.Type, { foreignKey: "catalogId", as: "catalogTypeData" })
        }
    }
    Catalog.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,

        },
        {
            sequelize,
            modelName: "Catalog",
        }
    );
    return Catalog;
};
