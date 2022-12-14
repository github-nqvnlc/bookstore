"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Type.hasMany(models.Book, { foreignKey: "typeId", as: "typeData" })
            
            Type.belongsTo(models.Catalog, { foreignKey: "catalogId", as: "catalogTypeData" })
        }
    }
    Type.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            catalogId: DataTypes.INTEGER,

        },
        {
            sequelize,
            modelName: "Type",
        }
    );
    return Type;
};
