const express = require("express");
const userController = require("./../controllers/user");
const cheackAuth = require("./../middlewares/cheakAuth");
const cheackPermission = require("./../middlewares/cheackPermission");
const { errorWrapper } = require("../../utils/errorWrapper");

const router = express.Router();

// Create a new user
router.post("/", errorWrapper(userController.createUser));

// Get all users
router.get(
  "/",
  [cheackAuth, cheackPermission],
  errorWrapper(userController.getAllUsers)
);

// Get current user
router.get(
  "/whoami",
  [cheackAuth],
  errorWrapper(userController.getCurrentUser)
);

// Log in user
router.post("/login", errorWrapper(userController.logInUser));

// Log out user
router.post("/logout", errorWrapper(userController.logOutUser));

// Update an existing user
router.put(
  "/:userName",
  [cheackAuth, cheackPermission],
  errorWrapper(userController.updateUser)
);

// Delete a user
router.delete(
  "/:userName",
  [cheackAuth, cheackPermission],
  errorWrapper(userController.deleteUser)
);

// Get a user by username
router.get(
  "/:userName",
  [cheackAuth, cheackPermission],
  errorWrapper(userController.getUserByName)
);

module.exports = router;
