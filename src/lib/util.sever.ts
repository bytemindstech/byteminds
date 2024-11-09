// PUT YOUR REUSABLE SERVER SIDE STAND ALONE FUNCTIONS OR CLASS HERE
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { route } from "./ROUTES";
import { Argon2id } from "oslo/password";
import { generateId, type User } from "lucia";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

// Start write types or interface here
type ValidateVerificationCode = {
  valid: boolean;
  message: string;
};

type ValidateResponse =
  | { valid: false; message: string }
  | {
      valid: true;
      message: string;
      userId: string;
    };

// Start write variables here

// Initialized Object Storage instance
const minIOClient = new S3Client({
  endpoint: "https://minio-gw8go8o0wkkg0cosk08gkw8o.51.79.156.25.sslip.io",
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const dateOption: Intl.DateTimeFormatOptions = {
  dateStyle: "full",
  timeStyle: "full",
  timeZone: "Asia/Manila",
};

// Mail transporter parameters
const params = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  service: SMTP_SERVICE,
  email: ADMIN_EMAIL,
  password: ADMIN_EMAIL_APP_PASSWORD,
};

// Start write Classes here

/**
 * A class for handling email verification codes, including generation, sending, and validation.
 */
export class EmailVerificationCode {
  /**
   * Generates a new email verification code for a user and stores it in the database.
   *
   * @param {string} userId - The ID of the user for whom the verification code is generated.
   * @param {string} email - The email address to associate with the verification code.
   * @returns {Promise<string>} A promise that resolves to the generated verification code.
   */
  async generate(userId: string, email: string): Promise<string> {
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
  }

  /**
   * Sends the verification code to the specified email address.
   *
   * @param {string} email - The recipient's email address.
   * @param {string} verificationCode - The verification code to be sent.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   * @throws Will log an error if the email fails to send.
   */
  async send(email: string, verificationCode: string): Promise<void> {
    const transporter = mod.mailTransporter(
      params.host,
      params.port,
      params.secure,
      params.service,
      params.email,
      params.password,
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

    const message = mod.composeMessage(
      ADMIN_EMAIL,
      email,
      subject,
      htmlContent,
    );

    try {
      await transporter.sendMail(message);
    } catch (error) {
      console.error(
        "Error sending verification code,",
        (error as Error).message,
      );
    }
  }

  /**
   * Validates the provided verification code for the user.
   *
   * @param {User} user - The user object containing user details.
   * @param {string} code - The verification code to validate.
   * @returns {Promise<ValidateVerificationCode>} A promise that resolves to an object indicating
   *   whether the verification code is valid and a related message.
   */
  async validate(user: User, code: string): Promise<ValidateVerificationCode> {
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
  }
}

/**
 * A class for generating, sending, and validating password reset tokens.
 */
export class ResetPasswordToken {
  /**
   * Generates a new password reset token for a user and stores it in the database.
   *
   * @param {string} userId - The ID of the user requesting the password reset.
   * @returns {Promise<string>} A promise that resolves to the generated reset token.
   */
  async generate(userId: string): Promise<string> {
    const tokenId = generateId(40);
    const expiresAt = createDate(new TimeSpan(1, "h"));

    //database transaction delete and create reset token
    await ResetPasswordService.databaseResetPasswordTransaction(
      userId,
      tokenId,
      expiresAt,
    );

    return tokenId;
  }

  /**
   * Sends a password reset email with a link containing the reset token.
   *
   * @param {string} email - The email address to send the reset link to.
   * @param {string} resetToken - The reset token to include in the email link.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   * @throws Will log an error if the email fails to send.
   */
  async send(email: string, resetToken: string): Promise<void> {
    const transporter = mod.mailTransporter(
      params.host,
      params.port,
      params.secure,
      params.service,
      params.email,
      params.password,
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

    const message = mod.composeMessage(
      ADMIN_EMAIL,
      email,
      subject,
      htmlContent,
    );

    try {
      await transporter.sendMail(message);
    } catch (error) {
      console.error(
        "Error sending reset password email",
        (error as Error).message,
      );
    }
  }

  /**
   * Validates the provided password reset token.
   *
   * @param {string} tokenId - The reset token to validate.
   * @returns {Promise<ValidateResponse>} A promise that resolves to an object indicating
   *   whether the token is valid, with an optional userId if valid.
   */
  async validate(tokenId: string): Promise<ValidateResponse> {
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
        message:
          "Password reset link token has expired. Please request new one",
      };
    }

    return {
      valid: true,
      message: "Password reset link token is valid",
      userId: passwordResetToken.userId,
    };
  }
}

/**
 * A class for interacting with object storage, providing methods to
 * manage objects in storage buckets, such as deleting, updating, or adding an object.
 */
export class ObjectStorage {
  /**
   * Uploads an object to the specified storage bucket.
   *
   * @param {Object} params - The parameters for the upload operation.
   * @param {string} params.Bucket - The name of the bucket to upload the object to.
   * @param {string} [params.Key] - The key (identifier) for the object in the bucket.
   * @param {Uint8Array<ArrayBuffer>} params.Body - The data to be uploaded as the object content.
   * @returns {Promise<void>} A promise that resolves when the object is successfully uploaded.
   * @throws Will log an error if the upload operation fails due to network or permission issues.
   */
  async upload(params: {
    Bucket: string;
    Key: string;
    Body: Uint8Array<ArrayBuffer>;
  }): Promise<void> {
    const command = new PutObjectCommand(params);

    try {
      await minIOClient.send(command);
    } catch (error) {
      console.error(
        "Error uploading object:",
        error instanceof Error ? error.message : error,
      );
    }
  }

  /**
   * Deletes an object from the specified storage bucket.
   *
   * @param {string} bucket - The name of the bucket from which to delete the object.
   * @param {string} [key] - The key (identifier) of the object to delete.
   *   If `key` is not provided, the delete operation is skipped, and a warning is logged.
   * @returns {Promise<void>} A promise that resolves when the object is deleted,
   *   or if the operation is skipped due to a missing `key`.
   * @throws Will log an error if the deletion fails due to network issues or
   *   permissions-related errors.
   */
  async delete(bucket: string, key?: string): Promise<void> {
    if (!key) {
      console.warn("Delete operation skipped: key is undefined.");
      return;
    }

    const deleteParams = { Bucket: bucket, Key: key };

    try {
      await minIOClient.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting object:", error.message);
      } else {
        console.error("Unexpected error deleting object:", error);
      }
    }
  }

  /**
   * Generates a pre-signed URL for accessing an object in the specified storage bucket.
   *
   * @param {string} bucket - The name of the bucket where the object is stored.
   * @param {string} [key] - The key (identifier) of the object to generate url.
   *   If `key` is not provided, the operation is skipped, and a warning is logged.
   * @returns {Promise<string>} A promise that resolves with the URL of the specified object.
   *   If the operation is skipped due to a missing `key`, an empty string is returned.
   * @throws Will log an error if the update fails due to network issues or
   *   permissions-related errors.
   */
  async generatePresignedUrl(bucket: string, key?: string): Promise<string> {
    if (!key) {
      console.warn("Delete operation skipped: key is undefined.");
      return "";
    }

    try {
      const command = new GetObjectCommand({ Bucket: bucket, Key: key });
      const url = await getSignedUrl(minIOClient, command, { expiresIn: 3600 });

      return url;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating pre-signed url:", error.message);
        return "";
      } else {
        console.error("Unexpected error generating pre-signed url:", error);
        return "";
      }
    }
  }
}

// Start write stand alone functions here

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

// export const htmlElementsToString = (element: HTMLElement): string => {
//   element.style.display = "none";
//   const container = document.createElement("div");
//   container.appendChild(element.cloneNode(true));

//   return container.innerHTML;
// };
