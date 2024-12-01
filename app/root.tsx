import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "~/tailwind.css?url";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Toaster } from "react-hot-toast";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster position="bottom-right" reverseOrder={true} />
      </body>
    </html>
  );
}


export default function App() {
  const location = useLocation();
  return (
    <Layout>
      {location.pathname !== "/sign-in" && location.pathname !== "/sign-up" && (
        <Header />
      )}
      <main>
        <Outlet />
      </main>
      {location.pathname !== "/sign-in" && location.pathname !== "/sign-up" && (
        <Footer />
      )}
    </Layout>
  );
}
