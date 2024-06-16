/**
 * PUT YOUR REUSEABLE CLIENT SIDE FUNCTIONS HERE
 */

import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
import { route } from "./ROUTES";

export type TriggerToast = "error" | "success";

/**
 * @param {string} message - The message to display in the toast
 * @param {TriggerToast} type - The type of toast to display, "error" | "success"
 */
export const triggerToast = (message: string, type: TriggerToast) => {
  let background = "";

  if (type === "error") {
    background = "variant-filled-error";
  }

  if (type === "success") {
    background = "variant-filled-success";
  }

  const toastStore = getToastStore();
  const t: ToastSettings = {
    message: message,
    hideDismiss: true,
    timeout: 3000,
    background: background,
  };
  toastStore.trigger(t);
};

// This returns the socket URL
export const socketUrl = (pathname: string = "") => {
  const browser = typeof window !== "undefined";
  if (browser) return `ws${location.origin.slice(4)}${pathname}`;
  return "";
};

// main navigation paths
export const paths = [
  { route: route("/"), name: "home" },
  { route: route("/about"), name: "who we are" },
  { route: route("/courses"), name: "available courses" },
  { route: route("/tutors"), name: "freelance tutors" },
  { route: route("/faqs"), name: "faqs" },
];
