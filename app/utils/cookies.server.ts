import { createCookieSessionStorage } from "@remix-run/node";

export const authCookie = createCookieSessionStorage({
  cookie: {
    name: "remix_auth",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 7 * 30,
    httpOnly: true,
  }
});

