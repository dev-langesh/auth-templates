const { config } = require("../../config/constants");
const { AuthErrors } = require("../../errors/authErrors");
const { emailService } = require("../../lib/notification/email/email.service");
const { generateOtp } = require("../../utils/auth/generateOtp");
const { generateHash, compareHash } = require("../../utils/auth/hash");
const { AppError } = require("../../utils/error");
const { userService } = require("../user/user.service");
const { Otp } = require("./otp.model");

async function createOtp({ to, otp, notificationType }) {
  const expiresAt = new Date(Date.now() + config.otp.expirationTime);
  return await Otp.create({ to, otp, expiresAt, notificationType });
}

async function sendEmail(to, otp) {
  await emailService.sendEmailWithHtml({
    to,
    subject: "Your OTP Code",
    templateName: "auth/otp",
    data: {
      otp,
      email: to,
    },
  });
}

async function sendOTP({ notificationType, to }) {
  const otpRecord = await Otp.findOne({ to });
  const now = Date.now();

  if (notificationType === "email") await userService.findUserByEmail(to);

  if (otpRecord) {
    if (now - otpRecord.lastAttempt > config.otp.attemptsExpiry) {
      otpRecord.attempts = 0;
      otpRecord.lastAttempt = now;
      await otpRecord.save();
    }
    if (otpRecord.attempts >= config.otp.maxAttempts) {
      throw new AppError(AuthErrors.MAX_OTP_ATTEMPTS_REACHED);
    }

    if (now - otpRecord.lastAttempt < config.otp.resendCooldown) {
      throw new AppError(AuthErrors.OTP_RESEND_COOLDOWN);
    }
    const otp = generateOtp();
    const hashedOtp = await generateHash(otp);

    otpRecord.otp = hashedOtp;
    otpRecord.expiresAt = new Date(now + config.otp.expirationTime);
    otpRecord.attempts += 1;
    otpRecord.lastAttempt = now;
    await otpRecord.save();

    if (notificationType === "email") {
      await sendEmail(to, otp);
    }
  } else {
    const otp = generateOtp();
    const hashedOtp = await generateHash(otp);
    await createOtp({ to, otp: hashedOtp, notificationType });

    if (notificationType === "email") {
      await sendEmail(to, otp);
    }
  }
}

async function verifyOtp({ to, otp }) {
  const otpRecord = await Otp.findOne({ to });

  if (!otpRecord) {
    throw new AppError(AuthErrors.OTP_INVALID);
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new AppError(AuthErrors.OTP_EXPIRED);
  }

  const isValid = await compareHash(otp, otpRecord.otp);

  if (!isValid) {
    throw new AppError(AuthErrors.OTP_INVALID);
  }

  await Otp.deleteOne({ to });
  return true;
}

const otpService = {
  sendOTP,
  verifyOtp,
};

module.exports = { otpService };
