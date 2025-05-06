const { DataTypes } = require("sequelize");
const { sequelize } = require("./../../db");

const Entity = sequelize.define("Entity" , {
  name : {
    type : DataTypes.STRING,
    allowNull : false
  },
  is_deleted : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : false
  }
} , {
  timestamps : true
})

module.exports = Entity ;