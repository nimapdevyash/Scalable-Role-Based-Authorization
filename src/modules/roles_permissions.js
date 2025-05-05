const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db");

const RolesPermissions = sequelize.define(
  "RolesPermissions",
  {
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = RolesPermissions;
