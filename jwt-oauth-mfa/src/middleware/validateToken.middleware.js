const { tokenService } = require("../lib/jwt/token.service");
const { userService } = require("../modules/user/user.service");

async function validateToken(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = tokenService.verifyToken(token, "access");

    const user = await userService.findUserById(decoded.userId);

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }
}

module.exports = { validateToken };
