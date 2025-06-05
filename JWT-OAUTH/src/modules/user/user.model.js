const mongoose = require("mongoose");
const { roles } = require("../../config/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      default: null, // Default to null for Google users
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows for null values without index conflicts
    },
    picture: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false, // Disable __v field
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
