import Entity from "./entities";
import Permission from "./permissions";
import RolesPermissions from "./roles_permissions";
import Role from "./roles";

// permission to entity (1 : n)
Permission.hasMany(Entity);
Entity.belongsTo(Permission);

// role to permission (n : m)
Role.belongsToMany(Permission, {
  through: RolesPermissions,
  foreignKey: 'permission',
});
Permission.belongsToMany(Role, { through: RolesPermissions, foreignKey: 'role' });

module.exports = {
  Role,
  Entity,
  Permission,
  RolesPermissions,
};
