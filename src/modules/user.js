const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db");

const User = sequelize.define("User" , {
  name : {
    type : DataTypes.STRING,
    allowNull : false
  },
  age : {
    type : DataTypes.INTEGER,
    validate : {
      min : 18
    }
  }
}, {timestamps : true})

module.exports = User ;