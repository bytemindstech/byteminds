import { env } from "$env/dynamic/private";

/**
 * PUT CONSTANT VARIABLE HERE
 */

//adjust values in your .env files base in your own settings
const SMTP_HOST = env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = env.SMTP_PORT ? Number(env.SMTP_PORT) : 465;
const SMTP_SECURE = env.SMTP_SECURE ? Boolean(env.SMTP_SECURE) : true;
const SMTP_SERVICE = env.SMTP_SERVICE ?? "gmail";
const ADMIN_EMAIL = env.ADMIN_EMAIL ?? "byteminds.tech@gmail.com";
const ADMIN_EMAIL_APP_PASSWORD = env.ADMIN_EMAIL_APP_PASSWORD ?? "";
const URL = env.URL;
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
};
