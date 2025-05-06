const userService = require("../services/user");

module.exports = {
  createUser: {
    method: "post",
    path: "/",
    handler: (req, res) =>
      res.status(201).send(userService.createUser(req?.body)),
  },

  updateUser: {
    method: "put",
    path: "/:userName",
    handler: (req, res) =>
      res
        .status(200)
        .send(
          userService.updateUser({ ...req?.body, name: req?.params?.userName })
        ),
  },

  deleteUser: {
    method: "delete",
    path: "/:userName",
    handler: (req, res) =>
      res.status(200).send(userService.deleteUser(req?.body)),
  },

  getUserByName: {
    method: "get",
    path: "/:userName",
    handler: (req, res) =>
      res.status(200).send(userService.getUserByName(req?.params?.userName)),
  },

  getAllUsers: {
    method: "get",
    path: "/",
    handler: (req, res) =>
      res.status(200).send(userService.getAllUsers(req?.params)),
  },

  logInUser: {
    method: "post",
    path: "/login",
    handler: (req, res) => {
      const token = userService.logInUser(req?.body);
      return res.status(200).cookie("accessToken", token).json({
        message: "user logged in successfully",
      });
    },
  },

  logOutUser: {
    method: "get",
    path: "/logout",
    handler: (req, res) => {
      return res.clearCookie("accessToken").status(200).json({
        message: "User Logged Out Successfully",
      });
    },
  },
};
