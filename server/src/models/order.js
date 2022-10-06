"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.Book, { foreignKey: "bookId", as: "bookData" });
        }
    }
    Order.init(
        {
            createOn: DataTypes.DATE,
            createBy: DataTypes.STRING,
            totalPrice: DataTypes.FLOAT,
            shippingAddress: DataTypes.STRING,
            shippingPhone: DataTypes.STRING,
            bookId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
