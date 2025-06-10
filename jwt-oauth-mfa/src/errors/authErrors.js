const AuthErrors = {
  INVALID_CREDENTIALS: {
    errorCode: 1007,
    message: "Sign In failed. Check your credentials.",
    statusCode: 401,
  },
  USER_NOT_FOUND: {
    errorCode: 1008,
    message: "User not found. Please register.",
    statusCode: 404,
  },
  USER_ALREADY_EXISTS: {
    errorCode: 1009,
    message: "User already exists with this email.",
    statusCode: 409,
  },
  GOOGLE_ID_TOKEN_VERIFICATION_FAILED: {
    errorCode: 1010,
    message: "Failed to verify Google ID token.",
    statusCode: 401,
  },
  GOOGLE_EMAIL_NOT_VERIFIED: {
    errorCode: 1011,
    message: "Google email not verified. Please use a verified email.",
    statusCode: 401,
  },
  REFRESH_TOKEN_EXPIRED: {
    errorCode: 2000,
    message: "Session expired, please login again",
    statusCode: 401,
  },
  ACCESS_TOKEN_EXPIRED: {
    errorCode: 2001,
    message: "Access token expired",
    statusCode: 401,
  },
  MISSING_TOKEN: {
    errorCode: 2002,
    message: "Missing token. Please provide a valid token.",
    statusCode: 401,
  },
  INVALID_TOKEN: {
    errorCode: 2003,
    message: "Invalid token. Please log in again.",
    statusCode: 401,
  },
};

module.exports = { AuthErrors };
