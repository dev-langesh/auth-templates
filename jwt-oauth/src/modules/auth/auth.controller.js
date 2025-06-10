const asyncHandler = require("express-async-handler");
const { authService } = require("./auth.service");
const { cookieOptions } = require("../../config/cookieOptions");

async function registerUser(req, res) {
  const userData = req.body;
  const sres = await authService.registerUser(userData);

  res.cookie("accessToken", sres.tokens.accessToken, cookieOptions);
  res.cookie("refreshToken", sres.tokens.refreshToken, cookieOptions);

  res
    .status(201)
    .json({ message: "User registered successfully", user: sres.user });
}

async function loginUser(req, res) {
  const userData = req.body;
  const sres = await authService.loginUser(userData);

  res.cookie("accessToken", sres.tokens.accessToken, cookieOptions);
  res.cookie("refreshToken", sres.tokens.refreshToken, cookieOptions);

  res
    .status(200)
    .json({ message: "User logged in successfully", user: sres.user });
}

async function authStatus(req, res) {
  res.status(200).json({ user: req.user });
}

async function rotateTokens(req, res) {
  const { refreshToken } = req.cookies;

  const tokens = await authService.rotateTokens(refreshToken);
  res.cookie("accessToken", tokens.accessToken, cookieOptions);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  res.status(200).json({ message: "Tokens rotated successfully" });
}

async function loginUserWithGoogle(req, res) {
  const { idToken } = req.body;

  const sres = await authService.loginWithGoogle(idToken);

  res.cookie("accessToken", sres.tokens.accessToken, cookieOptions);
  res.cookie("refreshToken", sres.tokens.refreshToken, cookieOptions);

  res
    .status(200)
    .json({ message: "User logged in successfully", user: sres.user });
}

async function logoutUser(req, res) {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).json({ message: "User logged out successfully" });
}

const authController = {
  registerUser: asyncHandler(registerUser),
  loginUser: asyncHandler(loginUser),
  authStatus: asyncHandler(authStatus),
  rotateTokens: asyncHandler(rotateTokens),
  logoutUser: asyncHandler(logoutUser),
  loginUserWithGoogle: asyncHandler(loginUserWithGoogle),
};

module.exports = { authController };
