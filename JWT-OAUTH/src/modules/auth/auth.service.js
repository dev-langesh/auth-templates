const { tokenService } = require("../../lib/jwt/token.service");
const { userService } = require("../user/user.service");
const bcrypt = require("bcrypt");

async function registerUser(data) {
  const payload = { ...data };

  payload.password = await bcrypt.hash(payload.password, 10);

  const user = await userService.createUser(payload);
  const tokens = tokenService.generateTokens(user);

  return { user, tokens };
}

async function loginUser(data) {
  const { email, password } = data;
  const user = await userService.findUserByEmail(email, true);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const tokens = tokenService.generateTokens(user);

  return { user, tokens };
}

async function rotateTokens(refreshToken) {
  if (!refreshToken) {
    throw new Error("Session expired, please login again");
  }

  try {
    const decoded = tokenService.verifyToken(refreshToken, "refresh");
    const user = await userService.findUserById(decoded.userId);

    const tokens = tokenService.generateTokens(user);

    return tokens;
  } catch (error) {
    throw new Error("Session expired, please login again");
  }
}

const authService = {
  registerUser,
  loginUser,
  rotateTokens,
};

module.exports = { authService };
