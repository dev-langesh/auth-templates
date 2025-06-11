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

  // OTP Errors
  MAX_OTP_ATTEMPTS_REACHED: {
    errorCode: 1100,
    message: "Maximum OTP attempts reached. Try again later.",
    statusCode: 429,
  },
  OTP_RESEND_COOLDOWN: {
    errorCode: 1101,
    message: "Please wait before requesting a new OTP.",
    statusCode: 429,
  },
  OTP_EXPIRED: {
    errorCode: 1102,
    message: "OTP has expired. Please request a new one.",
    statusCode: 410,
  },
  OTP_INVALID: {
    errorCode: 1103,
    message: "Invalid OTP provided.",
    statusCode: 400,
  },
  OTP_NOT_FOUND: {
    errorCode: 1104,
    message: "No OTP found. Please request one first.",
    statusCode: 404,
  },

  //  Token Errors
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

  // Notification Errors
  EMAIL_SEND_FAILED: {
    errorCode: 3000,
    message: "Failed to send email. Please try again later.",
    statusCode: 500,
  },
};

module.exports = { AuthErrors };
