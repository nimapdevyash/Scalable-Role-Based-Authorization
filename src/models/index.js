const Entity = require("./entities.js");
const Permission = require("./permissions.js");
const RolesPermissions = require("./roles_permissions.js");
const Role = require("./roles.js");
const { sequelize } = require("../../db/index.js");
const User = require("./user.js");

// permission to entity (1 : n)
Permission.hasMany(Entity);
Entity.belongsTo(Permission);

// role to permission (n : m)
Role.belongsToMany(Permission, {
  through: RolesPermissions,
  foreignKey: "permission",
});
Permission.belongsToMany(Role, {
  through: RolesPermissions,
  foreignKey: "role",
});

// each user can have only one role
Role.hasOne(User);
User.belongsTo(Role);

sequelize.sync({ force: true });

module.exports = {
  Role,
  User,
  Entity,
  Permission,
  RolesPermissions,
};
