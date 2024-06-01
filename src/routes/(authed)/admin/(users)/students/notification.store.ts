import { io } from "socket.io-client";
import { browser } from "$app/environment";
import { socketUrl } from "$lib/util.client";
import { writable, type Writable } from "svelte/store";

export type Notification = {
  id: number;
  type: "success" | "error";
  message: string;
  createdAt: string;
};

export const createConnection = (userId: string) => {
  const { subscribe, update }: Writable<Notification[]> = writable<
    Notification[]
  >([]);

  const socket = io(socketUrl(), {});

  const init = () => {
    if (browser) {
      socket.on("connect", () => {
        console.log(userId, "connected");
      });

      socket.on(
        userId,
        ({ message, type }: { message: string; type: "success" | "error" }) => {
          return update((notifications) => {
            return [
              ...notifications,
              {
                id: notifications.length + 1,
                type,
                message,
                createdAt: new Date().toISOString(),
              },
            ];
          });
        },
      );
    }
  };

  const notify = (
    notifyUserId: string,
    message: string,
    type: "success" | "error",
  ) => {
    socket.emit("notify", { notifyUserId, message, type });
  };

  return {
    subscribe,
    init,
    notify,
    close: () => socket.close(),
  };
};
