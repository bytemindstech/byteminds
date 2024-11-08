// PUT YOUR REUSABLE SERVER SIDE FUNCTIONS HERE
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { route } from "./ROUTES";
import { Argon2id } from "oslo/password";
import { generateId, type User } from "lucia";

import dateFormatter from "@jhenbert/date-formatter";

import * as mod from "@jhenbert/byteminds-util";
import * as EmailService from "./server/services/email.service";
import * as ResetPasswordService from "./server/services/reset-password.service";
import * as PasswordService from "./server/services/password.service";
import * as UserService from "./server/services/user.service";

import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  URL,
  ADMIN_EMAIL,
  ADMIN_EMAIL_APP_PASSWORD,
  SMTP_SERVICE,
  S3_ACCESS_KEY_ID,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
} from "./constants";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type ValidateVerificationCode = {
  valid: boolean;
  message: string;
};

const dateOption: Intl.DateTimeFormatOptions = {
  dateStyle: "full",
  timeStyle: "full",
  timeZone: "Asia/Manila",
};

const mailTransporterParams = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  service: SMTP_SERVICE,
  email: ADMIN_EMAIL,
  password: ADMIN_EMAIL_APP_PASSWORD,
};

export const generateEmailVerificationCode = async (
  userId: string,
  email: string,
): Promise<string> => {
  const code = generateRandomString(6, alphabet("0-9", "A-Z"));
  const expiresAt = createDate(new TimeSpan(24, "h"));
  //for debugging purpose only
  // console.log("Code: ", code);

  //delete email verification code if exist and create new one
  await EmailService.databaseEmailVerificationCodeTransaction(
    userId,
    email,
    code,
    expiresAt,
  );

  return code;
};

export const sendVerificationCode = async (
  email: string,
  verificationCode: string,
) => {
  const transporter = mod.mailTransporter(
    mailTransporterParams.host,
    mailTransporterParams.port,
    mailTransporterParams.secure,
    mailTransporterParams.service,
    mailTransporterParams.email,
    mailTransporterParams.password,
  );

  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByEmail(email);

  if (!existingVerificationCode) {
    return;
  }

  const formatDate = dateFormatter(
    "en-PH",
    dateOption,
    existingVerificationCode.expiresAt,
  );

  const subject = `Email verification code: ${verificationCode}`;

  const htmlContent = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #260202;">
  <h1>Verification Code</h1>
  
  <p>Verify your email, you've registered to ByteMinds using ${existingVerificationCode.email}</p>
  
  <p>Use this code to finish setting up your profile: ${verificationCode}</p>
  
  <p>This code will expire on ${formatDate}</p>
  </div>`;

  const message = mod.composeMessage(ADMIN_EMAIL, email, subject, htmlContent);

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error("Error sending verification code,", (error as Error).message);
  }
};

export const validateVerificationCode = async (
  user: User,
  code: string,
): Promise<ValidateVerificationCode> => {
  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByUserId(user.id);

  if (!existingVerificationCode || existingVerificationCode.code !== code) {
    return { valid: false, message: "Invalid Code" };
  }

  await EmailService.deleteEmailVerificationCodeByUserId(user.id);

  if (!isWithinExpirationDate(existingVerificationCode.expiresAt)) {
    return { valid: false, message: "Code Expired" };
  }

  if (existingVerificationCode.email !== user.email) {
    return { valid: false, message: "Email mismatch" };
  }

  return { valid: true, message: "Verification code valid" };
};

export const sendResetPasswordToken = async (
  email: string,
  resetToken: string,
) => {
  const transporter = mod.mailTransporter(
    mailTransporterParams.host,
    mailTransporterParams.port,
    mailTransporterParams.secure,
    mailTransporterParams.service,
    mailTransporterParams.email,
    mailTransporterParams.password,
  );

  const existingUser = await UserService.getUserByEmail(email);

  if (!existingUser) {
    return;
  }

  if (!existingUser.passwordReset) {
    return;
  }

  const formatDate = dateFormatter(
    "en-PH",
    dateOption,
    existingUser.passwordReset.expiresAt,
  );

  const subject = "Password Reset Request";

  const htmlContent = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #260202;">
		<h1>Password Reset Request</h1>
		<p>We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using the link below.</p>

		<p>
		<a href="${URL}${route("/password-reset")}?token=${resetToken}" style="color: #337ab7; text-decoration: none">Reset your password</a>
		</p>

		<p>If you need help or have any questions, please contact our support team. We're here to help!</p>
    
    <p>This code will expire on ${formatDate}</p>
	</div>`;

  const message = mod.composeMessage(ADMIN_EMAIL, email, subject, htmlContent);

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error(
      "Error sending reset password email",
      (error as Error).message,
    );
  }
};

export const createPasswordResetToken = async (userId: string) => {
  const tokenId = generateId(40);
  const expiresAt = createDate(new TimeSpan(1, "h"));

  //database transaction delete and create reset token
  await ResetPasswordService.databaseResetPasswordTransaction(
    userId,
    tokenId,
    expiresAt,
  );

  return tokenId;
};

export const verifyPasswordResetToken = async (tokenId: string) => {
  const passwordResetToken = await ResetPasswordService.getTokenById(tokenId);

  if (!passwordResetToken || passwordResetToken.id !== tokenId) {
    return {
      valid: false,
      message: "Password reset link token is invalid. Please request new one",
    };
  }

  if (!isWithinExpirationDate(passwordResetToken.expiresAt)) {
    return {
      valid: false,
      message: "Password reset link token has expired. Please request new one",
    };
  }

  return {
    userId: passwordResetToken.userId,
    valid: true,
    message: "Password reset link token is valid",
  };
};

export const isSameAsOldPassword = async (
  userId: string,
  newPassword: string,
) => {
  const existingPassword = await PasswordService.getPasswordByUserId(userId);

  if (!existingPassword) {
    return false;
  }

  const isSamePassword = await new Argon2id().verify(
    existingPassword.hashedPassword,
    newPassword,
  );

  return isSamePassword;
};

export const htmlElementsToString = (element: HTMLElement): string => {
  element.style.display = "none";
  const container = document.createElement("div");
  container.appendChild(element.cloneNode(true));

  return container.innerHTML;
};

// Object storage instance
export const minIOClient = new S3Client({
  endpoint: "https://minio-gw8go8o0wkkg0cosk08gkw8o.51.79.156.25.sslip.io",
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

/**
 *
 * @param bucket bucket name where the object is stored
 * @param key key of the object to be accessed
 * @returns secured url to access the object
 */
export const generatePresignedUrl = async (
  bucket: string,
  key: string | undefined,
) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const url = await getSignedUrl(minIOClient, command, { expiresIn: 3600 });
  return url;
};

/**
 *
 * @param bucket bucket name where the object is stored
 * @param key key of the object to be accessed
 */
export const deleteObject = async (bucket: string, key: string | undefined) => {
  try {
    const deleteParams = {
      Bucket: bucket,
      Key: key,
    };
    await minIOClient.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error("Error deleting object", (error as Error).message);
  }
};
