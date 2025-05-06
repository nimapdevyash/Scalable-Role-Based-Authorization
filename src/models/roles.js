const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db");

const Role = sequelize.define("Role" , {
  name : {
    type : DataTypes.STRING,
    allowNull : false,
  },
  description : {
    type : DataTypes.STRING,
    allowNull : true,
  },
  is_deleted : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : false
  }
} , {
  timestamps : true
})

module.exports = Role ;