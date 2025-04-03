const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const MeterReading = sequelize.define(
  "MeterReading",
  {
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nozzle_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    old_meter_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    new_meter_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = MeterReading;
