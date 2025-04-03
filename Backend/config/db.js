const { Sequelize } = require("sequelize");

// Create a Sequelize instance
const sequelize = new Sequelize("meter_readings_db", "root", "Tharakutty@", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };
