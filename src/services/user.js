const { Op } = require("sequelize");
const User = require("../modules/user");
const jwt = require("./../../utils/jwt");

async function createUser(data) {
  if (!data || !data.name || !data.age || !(data.age > 18) || !data.password || !data.email) {
    throw new Error("invalid credentials");
  }

  const user = await User.create(data);

  if (!user) {
    throw new Error("user creation failed");
  }

  return user;
}

async function updateUser(data) {
  if (!data || !data.name) {
    throw new Error("Insufficient Data");
  }

  const updateCount = await User.update(
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

  const updateCount = await User.update(
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

  const user = await User.findOne({
    where: {
      name: userName,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  return user;
}

async function getAllUsers(params) {
  const users = await User.findAll({
    where: {
      age: {
        [Op.lte]: params.age,
      },
    },
  });

  if (!users) {
    throw new Error("No Users Found");
  }

  return users;
}

async function logInUser(data) {
  const {email , password} = data ;

  if(!email || !password) {
    throw new Error(" Both Email And Password Are Required") ;
  }

  const user = await User.findOne({where : email , attributes : [ "email" , "role" , "name"]}) ;

  if(!user) {
    throw new Error("No User Exists With This EmailID")
  }

  const token = jwt.createAcessToken(user) ;

  return token ;
}

async function logOutUser(req) {}

module.exports = {
  createUser,
  getUserByName,
  getAllUsers,
  updateUser,
  deleteUser,
  logInUser,
  logOutUser,
};
