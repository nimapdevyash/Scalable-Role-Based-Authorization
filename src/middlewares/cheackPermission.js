const RolesPermissions = require("../modules/roles_permissions");

async function cheackPermission(req, res, next) {
  try {
    const role = req?.user?.role;

    if (!role) {
      throw new Error("invalid user , role not found");
    }

    const path = req.path;
    const sPath = path.split("/");

    const entity = sPath[1];
    const method = req.method;

    const { permission } = await RolesPermissions.findAll({
      where: role,
      group: role,
      include: Permissions,
    });

    if (!permission) {
      throw new Error("No Permissions Found");
    }

    const isUserAllowed = permission.some(
      (per) =>
        per.method == method &&
        per.path == path &&
        per.entity == entity &&
        !per.is_deleted
    );

    if (!isUserAllowed) {
      throw new Error("User Does Not Have Permission For This Route");
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = cheackPermission;
