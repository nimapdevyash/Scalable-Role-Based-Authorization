const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db");

const Permission = sequelize.define(
  "Permission",
  {
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

module.exports = Permission;
