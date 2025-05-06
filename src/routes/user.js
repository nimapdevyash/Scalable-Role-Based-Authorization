const routeManager = require("./../../utils/routeManager");
const controllers = require("./../controllers/user");
const cheackAuth = require("./../middlewares/cheakAuth");
const cheackPermission = require("./../middlewares/cheackPermission");

const router = require("express").Router();

// ALERT: just fancy stuff not recomended at all
for (let key in controllers) {
  routeManager({
    router,
    method: controllers[key].method,
    path: controllers[key].path,
    handler: controllers[key].handler,
    middlewares: ["logInUser" , "createUser"].includes(key) ? [] : [cheackAuth, cheackPermission] ,
  });
}

module.exports = router;
