import { env } from "$env/dynamic/private";

//put constant variable here

const SMTP_HOST = env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = env.SMTP_PORT ? Number(env.SMTP_PORT) : 465;
const SMTP_SECURE = env.SMTP_SECURE === "true";
const URL = "http://localhost:5173";
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
};
