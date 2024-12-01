import { createCookie } from "@remix-run/node";

export const authCookie = createCookie('auth-token', {
  maxAge: 60 * 60 * 24 * 30,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
});