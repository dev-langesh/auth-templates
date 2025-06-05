const jwt = require("jsonwebtoken");
const { env } = require("../../config/env");
const { AppError } = require("../../utils/error");
const { AuthErrors } = require("../../errors/authErrors");

function generateToken({ userId, role, tokenType }) {
  const payload = { userId, role, tokenType };
  const secret =
    tokenType === "access" ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;
  const options = {
    expiresIn:
      tokenType === "access"
        ? env.ACCESS_TOKEN_EXPIRY
        : env.REFRESH_TOKEN_EXPIRY,
  };

  return jwt.sign(payload, secret, options);
}

function generateTokens(user) {
  const accessToken = generateToken({
    userId: user._id,
    role: user.role,
    tokenType: "access",
  });
  const refreshToken = generateToken({
    userId: user._id,
    role: user.role,
    tokenType: "refresh",
  });

  return { accessToken, refreshToken };
}

function verifyToken(token, tokenType) {
  const secret =
    tokenType === "access" ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(
        tokenType === "access"
          ? AuthErrors.ACCESS_TOKEN_EXPIRED
          : AuthErrors.REFRESH_TOKEN_EXPIRED
      );
    } else {
      throw new AppError(AuthErrors.INVALID_TOKEN);
    }
  }
}

const tokenService = { generateToken, generateTokens, verifyToken };

module.exports = { tokenService };
