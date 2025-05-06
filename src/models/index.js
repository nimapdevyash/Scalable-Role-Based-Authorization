const Entity = require("./entities.js");
const Permission = require("./permissions.js");
const RolesPermissions = require("./roles_permissions.js");
const Role = require("./roles.js");
const { sequelize } = require("../../db/index.js");
const User = require("./user.js");

// permission to entity ( n : 1)
Entity.hasMany(Permission, {foreignKey : 'entity'});
Permission.belongsTo(Entity, {foreignKey : 'entity'});

// role to permission (n : m)
Role.belongsToMany(Permission, {
  through: RolesPermissions,
  foreignKey: "role",
});
Permission.belongsToMany(Role, {
  through: RolesPermissions,
  foreignKey: "permission",
});

// each user can have only one role
Role.hasOne(User , {foreignKey : 'role'});
User.belongsTo(Role, {foreignKey : 'role'});

sequelize.sync({force : true});
// sequelize.sync();

module.exports = {
  Role,
  User,
  Entity,
  Permission,
  RolesPermissions,
};
