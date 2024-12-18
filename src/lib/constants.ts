/*
 *PUT CONSTANT VARIABLES HERE
 *
 *Adjust values in your .env files base in your own settings
 */
import * as env from "$env/static/private";

// Mailtransporter
const SMTP_HOST = env.SMTP_HOST! ?? "smtp.gmail.com";
const SMTP_PORT = Number(env.SMTP_PORT! ?? 465);
const SMTP_SECURE = Boolean(env.SMTP_SECURE! ?? true);
const SMTP_SERVICE = env.SMTP_SERVICE! ?? "gmail";

// Email and url
const ADMIN_EMAIL = env.ADMIN_EMAIL! ?? "byteminds.tech@gmail.com";
const ADMIN_EMAIL_APP_PASSWORD = env.ADMIN_EMAIL_APP_PASSWORD!;
const URL = env.URL!;

// Object Storage
const S3_REGION = env.S3_REGION!;
const S3_ACCESS_KEY_ID = env.S3_ACCESS_KEY_ID!;
const S3_SECRET_ACCESS_KEY = env.S3_SECRET_ACCESS_KEY!;
const BUCKET_NAME = "bm-s3-bucket";

// Zod validation
const MIN_PASSWORD_LENGTH = 8;
const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 31;
const MAX_CODE_LENGTH = 6;

export {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  URL,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MAX_CODE_LENGTH,
  ADMIN_EMAIL,
  ADMIN_EMAIL_APP_PASSWORD,
  SMTP_SERVICE,
  S3_REGION,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  BUCKET_NAME,
};
