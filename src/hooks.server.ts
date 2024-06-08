import { lucia } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { useServer } from "vite-sveltekit-node-ws";
import { Server } from "socket.io";
import db from "$lib/server/db";

const authHandler: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(sessionId);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};

useServer((server) => {
  const ws = new Server(server);

  ws.setMaxListeners(0);

  ws.on("connect", (socket) => {
    socket.join("notifications");
    socket.on(
      "notify",
      ({
        notifyUserId,
        message,
        type,
      }: {
        notifyUserId: string;
        message: string;
        type: "success" | "error";
      }) => {
        console.log("Sending notification to", notifyUserId);
        socket.to("notifications").emit(notifyUserId, {
          message,
          type,
        });
      },
    );
  });
});

// Ensure PrismaClient disconnect on app shutdown
process.on("beforeExit", async () => {
  await db.$disconnect();
});

process.on("SIGINT", async () => {
  await db.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await db.$disconnect();
  process.exit(0);
});

export const handle = sequence(authHandler);
