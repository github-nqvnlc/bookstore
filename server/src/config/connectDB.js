const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("user", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Database connect successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
