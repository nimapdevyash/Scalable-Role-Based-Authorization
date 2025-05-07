const { Op } = require("sequelize");
const model = require("../models");
const jwt = require("./../../utils/jwt");

async function createUser(data) {
  if (
    !data ||
    !data.name ||
    !data.age ||
    !(data.age > 18) ||
    !data.password ||
    !data.email
  ) {
    throw new Error("invalid credentials");
  }

  const user = await model.User.create(data);

  if (!user) {
    throw new Error("user creation failed");
  }

  return user;
}

async function updateUser(data) {
  if (!data || !data.name) {
    throw new Error("Insufficient Data");
  }

  const updateCount = await model.User.update(
    {
      ...data,
    },
    {
      where: {
        name: data.name,
      },
    }
  );

  if (!updateCount) {
    throw new Error("user updation failed");
  }
}

async function deleteUser(userName) {
  if (!userName) {
    throw new Error("userName is Required");
  }

  const updateCount = await model.User.update(
    {
      is_deleted: true,
    },
    {
      where: {
        is_deleted: false,
        name: userName,
      },
    }
  );

  if (!updateCount) {
    throw new Error("user updation failed");
  }
}

async function getUserByName(userName) {
  if (!userName) {
    throw new Error("Users Name is Required");
  }

  const user = await model.User.findOne({
    where: {
      name: userName,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  return user;
}

async function getAllUsers() {

  const users = await model.User.findAll({
    where: {
      is_deleted: false,
    },
    attributes : ["id" , "name" , "age" , "email" , "role"],
    raw : true,
    nest: true
  });

  if (!users) {
    throw new Error("No Users Found");
  }

  return users;
}

async function logInUser(data) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error(" Both Email And Password Are Required");
  }

  const user = await model.User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("No User Exists With This EmailID");
  }

  if(user.password !== password) {
    throw new Error("Invalid Password")
  }

  const token = jwt.createAcessToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return token;
}

module.exports = {
  createUser,
  getUserByName,
  getAllUsers,
  updateUser,
  deleteUser,
  logInUser,
};
