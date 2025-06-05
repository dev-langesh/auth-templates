const { env } = require("../../config/env");
const { tokenService } = require("../../lib/jwt/token.service");
const { userService } = require("../user/user.service");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyIdToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID, // Make sure this matches your frontend
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture, email_verified } = payload;

    if (!email_verified) {
      throw new Error("Email not verified by Google");
    }

    return { googleId, email, name, picture };
  } catch (err) {
    console.error("Failed to verify Google ID token:", err.message);
    throw new Error("Failed to verify Google ID token");
  }
}

async function loginWithGoogle(idToken) {
  const { googleId, email, name, picture } = await verifyIdToken(idToken);

  let user = await userService.findUserByEmail(email, false, false);

  if (!user) {
    user = await userService.createUser({
      googleId,
      email,
      name,
      picture,
      provider: "google",
    });
  }

  const tokens = tokenService.generateTokens(user);

  return { user, tokens };
}

const authService = {
  registerUser,
  loginUser,
  rotateTokens,
  verifyIdToken,
  loginWithGoogle,
};

module.exports = { authService };
