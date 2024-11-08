import * as env from "$env/static/private";

/**
 * PUT CONSTANT VARIABLE HERE
 */

// Adjust values in your .env files base in your own settings
const SMTP_HOST = env.SMTP_HOST! ?? "smtp.gmail.com";
const SMTP_PORT = Number(env.SMTP_PORT! ?? 465);
const SMTP_SECURE = Boolean(env.SMTP_SECURE! ?? true);
const SMTP_SERVICE = env.SMTP_SERVICE! ?? "gmail";
const ADMIN_EMAIL = env.ADMIN_EMAIL! ?? "byteminds.tech@gmail.com";
const ADMIN_EMAIL_APP_PASSWORD = env.ADMIN_EMAIL_APP_PASSWORD!;
const URL = env.URL!;
const S3_REGION = env.S3_REGION!;
const S3_ACCESS_KEY_ID = env.S3_ACCESS_KEY_ID!;
const S3_SECRET_ACCESS_KEY = env.S3_SECRET_ACCESS_KEY!;

const BUCKET_NAME = "bm-s3-bucket";

// Zod validation
const MIN_PASSWORD_LENGTH = 8;
const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 31;

export {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  URL,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  ADMIN_EMAIL,
  ADMIN_EMAIL_APP_PASSWORD,
  SMTP_SERVICE,
  S3_REGION,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  BUCKET_NAME,
};
