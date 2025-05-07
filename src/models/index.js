const Entity = require("./entities.js");
const Permission = require("./permissions.js");
const RolesPermissions = require("./roles_permissions.js");
const Role = require("./roles.js");
const { sequelize } = require("../../db/index.js");
const User = require("./user.js");

// permission to entity (n:1)
Entity.hasMany(Permission, { foreignKey: "entity" });
Permission.belongsTo(Entity, { foreignKey: "entity" });

// Role <-> Permission (many-to-many)
Role.belongsToMany(Permission, {
  through: RolesPermissions,
  foreignKey: "role",
  otherKey: "permission",
});
Permission.belongsToMany(Role, {
  through: RolesPermissions,
  foreignKey: "permission",
  otherKey: "role",
});

// 🔁 Add reverse lookup (optional but helpful for querying)
RolesPermissions.belongsTo(Permission, { foreignKey: "permission" });
RolesPermissions.belongsTo(Role, { foreignKey: "role" });
Permission.hasMany(RolesPermissions, { foreignKey: "permission" });
Role.hasMany(RolesPermissions, { foreignKey: "role" });

// User has one role
Role.hasOne(User, { foreignKey: "role" });
User.belongsTo(Role, { foreignKey: "role" });

module.exports = {
  Role,
  User,
  Entity,
  Permission,
  RolesPermissions,
};
