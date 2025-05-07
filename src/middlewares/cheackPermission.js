const model = require("../models");

async function cheackPermission(req, res, next) {
  try {
    const role = req?.user?.role;

    if (!role) {
      throw new Error("invalid user , role not found");
    }

    const path = req.originalUrl;
    const sPath = path.split("/");

    const entityName = (() => {
      for (let i = 0; i < sPath.length; i++) {
        if (sPath[i] === "api") {
          return sPath[i + 1];
        }
      }
      return "";
    })();

    const entity = await model.Entity.findOne({
      where : {
        name : entityName
      }
    })

    if(!entity) {
      throw new Error("Invalid Entity")
    }
    const method = req.method.toLowerCase();

    const result = await model.RolesPermissions.findAll({
      where: { role },
      include: [
        {
          model: model.Permission,
        },
      ],
      nest: true,
      raw: true,
    });

    if (!result) {
      throw new Error("No Permissions Found");
    }

    for (let obj of result) {
      // console.log(`
      //    ${obj.Permission.method} == ${method}
      //   ${obj.Permission.path} == ${path}
      //   ${obj.Permission.entity} == ${entity.id}
      //   ${obj.Permission.is_deleted}       
      //   `)
      if (
        obj.Permission.method.trim() == method.trim() &&
        obj.Permission.path.trim() == path.trim() &&
        obj.Permission.entity == entity.id &&
        !obj.Permission.is_deleted
      ) {
        return next() ;
      }
    }

    throw new Error("User Does Not Have Permission For This Route");
  } catch (error) {
    next(error);
  }
}

module.exports = cheackPermission;
