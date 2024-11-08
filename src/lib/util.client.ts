/**
 * PUT YOUR REUSEABLE CLIENT SIDE FUNCTIONS HERE
 */
import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
import { route } from "./ROUTES";
import fetchHandler, { type ServerResponse } from "@jhenbert/fetch";

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
  const toast: ToastSettings = {
    message: message,
    hideDismiss: true,
    timeout: 3000,
    background: background,
  };
  toastStore.trigger(toast);
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
  { route: route("blog"), name: "blog" },
];

// use in user profile avatar
export const getInitials = (fullName: string) => {
  const nameArr = fullName.split(" ");
  const fInit = nameArr[0].charAt(0).toUpperCase();
  const lInit = nameArr[1].charAt(0).toUpperCase();

  return fInit + lInit;
};

// date option used in client side
export const dateOption: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Manila",
};

// utility function to capitalize word
export const capitalize = (s: string) => {
  return s
    .split(" ") //split strings into an array of words
    .map((w) => w[0].toUpperCase() + w.slice(1)) //capitalize each word
    .join(" "); //join back into single string
};

// get all courses
export const getCourses: () => Promise<ServerResponse<Course[], Error>> =
  fetchHandler<Course[]>(() => fetch(route("GET /api/courses")));

export const resetTitle = (title: string) => {
  if (typeof document !== "undefined") {
    return (document.title = title);
  }
};

// Get image url in S3 bucket
export const getImageUrl = async (courseId: string) => {
  try {
    const response = await fetch(
      route("GET /api/courses/image/[courseId]", { courseId }),
    );

    if (!response.ok) {
      console.error("Failed to fetch");
    }

    return await response.json();
  } catch (error) {
    console.error("Error while fetching", (error as Error).message);
  }
};
