const { validateInput } = require("../../middleware/validateInput.middleware");
const { validateToken } = require("../../middleware/validateToken.middleware");
const { authController } = require("./auth.controller");
const { registerSchema, loginSchema } = require("./auth.inputSchema");

const router = require("express").Router();

router.post(
  "/register",
  validateInput(registerSchema),
  authController.registerUser
);
router.post("/login", validateInput(loginSchema), authController.loginUser);
router.post("/login/google", authController.loginUserWithGoogle);
router.get("/status", validateToken, authController.authStatus);
router.post("/rotate-tokens", authController.rotateTokens);
router.post("/logout", authController.logoutUser);

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

module.exports = { authRouter: router };
