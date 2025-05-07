const userService = require("../services/user");

module.exports = {
  createUser: async (req, res) => {
    const user = await userService.createUser(req?.body);
    return user && res.status(201).send(user);
  },

  updateUser: async (req, res) => {
    await userService.updateUser({
      ...req?.body,
      userName: req?.params?.userName,
    });
    return res.status(200).json({
      message: "user updated successfully",
    });
  },

  deleteUser: async (req, res) => {
    await userService.deleteUser(req?.params?.userName);
    return res.status(200).json({
      message: "user deleted successfully",
    });
  },

  getUserByName: async (req, res) => {
    const user = await userService.getUserByName(req?.params?.userName);
    return res.status(200).json({
      message: "user fetched successfully",
      data: user,
    });
  },

  getAllUsers: async (req, res) => {
    const result = await userService.getAllUsers();
    return res.status(200).send(result);
  },

  getCurrentUser: async (req, res) => {
    const result = await userService.getCurrentUser(req?.user?.id);
    return res.status(200).send(result);
  },

  logInUser: async (req, res) => {
    const token = await userService.logInUser(req?.body);
    return res.status(200).cookie("accessToken", token).json({
      message: "user logged in successfully",
    });
  },

  logOutUser: async (req, res) => {
    return res.clearCookie("accessToken").status(200).json({
      message: "User Logged Out Successfully",
    });
  },
};
