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
  },
  password : {
    type : DataTypes.STRING,
    allowNull : false
  },
  email : {
    type : DataTypes.STRING,
    allowNull : false
  },
  role : {
    type : DataTypes.INTEGER,
    allowNull : false
  }
}, {timestamps : true})

module.exports = User ;