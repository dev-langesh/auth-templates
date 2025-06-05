require("dotenv").config();
const { z } = require("zod");

const envSchema = z.object({
  PORT: z.string().min(2).max(4).default("8000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  MONGODB_URI: z.string().min(10).max(500).url(),
  ACCESS_TOKEN_SECRET: z.string().min(10).max(100),
  REFRESH_TOKEN_SECRET: z.string().min(10).max(100),
  ACCESS_TOKEN_EXPIRY: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRY: z.string().default("7d"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.log("Invalid environment variables:", env.error.format());
  process.exit(1);
}

module.exports = { env: env.data };
