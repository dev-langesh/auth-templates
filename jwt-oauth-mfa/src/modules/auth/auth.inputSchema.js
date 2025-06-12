const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(20),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
  }),
});

const googleLoginSchema = z.object({
  body: z.object({
    idToken: z.string().min(1),
  }),
});

const sendOtpSchema = z.object({
  body: z.object({
    notificationType: z.enum(["email", "sms"]),
    to: z.string().min(1),
    template: z.string().optional(),
  }),
});

const verifyOtpSchema = z.object({
  body: z.object({
    otp: z.string().min(6).max(6),
    to: z.string().min(1),
  }),
});

const verifyOtpToResetPasswordSchema = z.object({
  body: z.object({
    otp: z.string().min(6).max(6),
    to: z.string().min(1),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1),
    password: z.string().min(8).max(20),
  }),
});

const authInputSchema = {
  registerSchema,
  loginSchema,
  googleLoginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  verifyOtpToResetPasswordSchema,
  resetPasswordSchema,
};

module.exports = { authInputSchema };
