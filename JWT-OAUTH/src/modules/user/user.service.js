const { User } = require("./user.model");

async function createUser(data) {
  let user = await User.findOne({ email: data.email });

  if (user) {
    throw new Error("User already exists with this email");
  }
  return await User.create(data);
}

async function findUserByEmail(email,includePassword = false) {
  const user = await User.findOne({ email }).select((includePassword ? "+" : "-") + "password");

  if (!user) {
    throw new Error("User not found with this email");
  }

  return user;
}

async function findUserById(id) {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new Error("User not found with this ID");
  }
  return user;
}

const userService = {
  createUser,
  findUserByEmail,
  findUserById,
};

module.exports = { userService };
